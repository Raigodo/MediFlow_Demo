<?php

namespace App\Http\Requests\User;

use App\Enums\UserRole;
use Illuminate\Validation\Rules\Enum;
use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
{
    protected function prepareForValidation(): void
    {
        // Parse the string status value into the appropriate enum
        if ($this->has('role')) {
            $role = UserRole::tryFrom($this->input('role'));
            $this->merge(['role' => $role->value]);
        }
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'min:2', 'max:255'],
            'surname' => ['required', 'string', 'min:2', 'max:255'],
            'email' => ['required', 'email', 'unique:users,email'],
            'role' => ['required', new Enum(UserRole::class)],
            'password' => ['required', 'string', 'min:8'],
        ];
    }
}
