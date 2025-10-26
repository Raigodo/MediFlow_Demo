<?php

namespace App\Http\Requests\Auth;

use App\Models\Employee;
use Illuminate\Support\Str;
use App\Services\CurrentContext;
use Illuminate\Support\Facades\DB;
use Illuminate\Auth\Events\Lockout;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\RateLimiter;
use App\Services\DataAccess\Facades\Users;
use Illuminate\Validation\ValidationException;
use App\Services\DataAccess\Facades\Invitations;
use App\Services\DataAccess\Facades\TrustedDevices;

class JoinRequest extends FormRequest
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
            'email' => ['required', 'string', 'email'],
            'password' => ['required', 'string'],
            "invitation"=> ['required','string'],
        ];
    }

    /**
     * Attempt to join existing user within conextual structure.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function join(): void
    {
        DB::transaction(function (){
            $this->ensureIsNotRateLimited();

            $token_value = $this->cookie('device_token');
            $device_token = TrustedDevices::findByToken($token_value) ?? abort(404);
            if ($device_token === null) {
                throw ValidationException::withMessages([
                    'email' => 'current device is not trusted',
                ]);
            }
            $data = $this->validated();

            $invitation = Invitations::findByToken($device_token->structure_id, $data['invitation']) ?? abort(404);

            if ($invitation === null
                || $invitation->created_employee_id
                || !Auth::attempt(
                        credentials: $this->only('email', 'password'),
                        remember: $this->boolean('remember')))
            {
                throw ValidationException::withMessages([
                    'email' => __('auth.failed'),
                ]);
            }

            RateLimiter::clear($this->throttleKey());
            $user_id = CurrentContext::userId();
            $user_role = CurrentContext::userRole();

            $employee = Employee::factory()->create([
                'role'=> $invitation->role,
                'user_id'=> $user_id,
                'structure_id'=> $device_token->structure_id,
            ]);

            $invitation->created_employee_id = $employee->id;
            $invitation->save();

            Session::regenerate();

            session([
                'user_id'=> $user_id,
                'user_role'=> $user_role,
                'structure_id'=> $device_token->structure_id,
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
