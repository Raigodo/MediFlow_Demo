<?php

namespace App\Http\Requests\Auth;

use App\Models\User;
use App\Enums\UserRole;
use Illuminate\Support\Str;
use Illuminate\Auth\Events\Lockout;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\RateLimiter;
use App\Services\DataAccess\Facades\Employees;
use Illuminate\Validation\ValidationException;
use App\Services\DataAccess\Facades\Structures;
use App\Services\DataAccess\Facades\TrustedDevices;

class LoginRequest extends FormRequest
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
        ];
    }

    /**
     * Attempt to authenticate the request's credentials.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function login(): void
    {
        $this->ensureIsNotRateLimited();

        $credentials = $this->only('email','password');

        if (! Auth::guard()->validate($credentials)) {
            RateLimiter::hit($this->throttleKey());
            throw ValidationException::withMessages([
                'email' => __('auth.failed'),
            ]);
        }

        $user = User::where(['email'=> $credentials['email']])->first();
        $structure_id = null;
        $employee = null;
        if ($user->role->value >= UserRole::ADMIN->value){
            //
        }
        else if ($user->role->value >= UserRole::MANAGER->value) {
            $token_value = $this->cookie('device_token');
            $trusted_device = $token_value
                ? TrustedDevices::findByToken($token_value)
                : null;
            $structure_id = $trusted_device?->structure_id;

            if (!$structure_id) {
                Cookie::queue(Cookie::forget('device_token'));
            }

            $default_structure = Structures::defaultPreview($user->id);
            
            if ($structure_id && $default_structure){
                $default_structure->structure_id = $structure_id;
            }
            else if ($default_structure) {
                $structure_id = $default_structure->structure_id;
            }

        }
        elseif ($token_value = $this->cookie('device_token')) {
            $structure_id = TrustedDevices::findByToken($token_value)?->structure_id;

            if (!$structure_id) {
                Cookie::queue(Cookie::forget('device_token'));
                throw ValidationException::withMessages([
                    'email' => 'Current device is not trusted.',
                ]);
            }
            
            $employee = Employees::findByStructure(
                $structure_id,
                $user->id,
            ) ?? abort(404);

            if ($employee?->deactivated_at){
                throw ValidationException::withMessages([
                    'email' => 'Current employee is deactivated',
                ]);
            }
        }
        else {
            throw ValidationException::withMessages([
                'email' => 'Current device is not trusted.',
            ]);
        }

        Auth::login($user, $this->boolean('remember'));
        RateLimiter::clear($this->throttleKey());

        session([
            'user_id'=> (string) $user->id,
            'user_role'=> (int) $user->role->value,
            'structure_id'=> (string) $structure_id,
            'employee_id'=> (string) $employee?->id,
            'employee_role'=> (int) $employee?->role->value,
            'admin_id'=> $user->role->value >= UserRole::ADMIN->value
                ? (string) $user->id
                : null,
        ]);
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
