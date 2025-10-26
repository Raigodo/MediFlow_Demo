<?php

namespace App\Http\Requests\Auth;

use DB;
use App\Enums\UserRole;
use App\Models\Employee;
use App\Models\Invitation;
use Illuminate\Support\Str;
use Illuminate\Auth\Events\Lockout;
use Illuminate\Support\Facades\Auth;
use Illuminate\Auth\Events\Registered;
use App\Services\DataAccess\Facades\Users;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Validation\ValidationException;
use App\Services\DataAccess\Facades\Structures;
use App\Services\DataAccess\Facades\Invitations;
use App\Services\DataAccess\Facades\TrustedDevices;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'min:2', 'max:50', 'regex:/^[\pL\s\-]+$/u'],
            'surname' => ['required', 'string', 'min:2', 'max:50', 'regex:/^[\pL\s\-]+$/u'],
            'email' => ['required', 'string', 'email', 'unique:users,email'],
            'password' => ['required', 'string'],
            "invitation"=> ['required','string'],
        ];
    }

    /**
     * Attempt to register new user within conextual structure.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function register(): void
    {
        DB::transaction(function ()
        {
            $this->ensureIsNotRateLimited();

            $token_value = $this->cookie('device_token');
            $trusted_device = TrustedDevices::findByToken($token_value) ?? abort(404);
            $data = $this->validated();
            
            $invitation = Invitations::findByToken($trusted_device->structure_id, $data['invitation']);;

            if (!$invitation || $invitation->created_employee_id){
                throw ValidationException::withMessages([
                    'email' => __('auth.failed'),
                ]);
            }

            unset($data['invitation']);

            $user = Users::create([
                ...$data,
                'role'=> UserRole::EMPLOYEE,
            ]);

            RateLimiter::clear($this->throttleKey());

            event(new Registered($user));
            Auth::login($user);

            $employee = Employee::factory()->create([
                'role'=> $invitation->role->value,
                'user_id'=> $user->id,
                'structure_id'=> $trusted_device->structure_id,
            ]);

            $invitation->created_employee_id = $employee->id;
            $invitation->save();

            session([
                'user_id'=> $user->id,
                'user_role'=> $user->role->value,
                'structure_id'=> $trusted_device->structure_id,
                'employee_id'=> $employee->id,
                'employee_role'=> $employee->role->value,
            ]);
        });
    }

    /**
     * Ensure the login request is not rate limited.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function ensureIsNotRateLimited(): void
    {
        if (! RateLimiter::tooManyAttempts($this->throttleKey(), 5)) {
            return;
        }

        event(new Lockout($this));

        $seconds = RateLimiter::availableIn($this->throttleKey());

        throw ValidationException::withMessages([
            'email' => __('auth.throttle', [
                'seconds' => $seconds,
                'minutes' => ceil($seconds / 60),
            ]),
        ]);
    }

    /**
     * Get the rate limiting throttle key for the request.
     */
    public function throttleKey(): string
    {
        return Str::transliterate(Str::lower($this->string('email')).'|'.$this->ip());
    }
}



