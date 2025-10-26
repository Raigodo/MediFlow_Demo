<?php

namespace App\Http\Requests\Invitation;

use App\Enums\EmployeeRole;
use Illuminate\Validation\Rules\Enum;
use Illuminate\Foundation\Http\FormRequest;

class StoreInvitationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        // Parse the string status value into the appropriate enum
        if ($this->has('role')) {
            $role = EmployeeRole::tryFrom($this->input('role'));
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
            'role' => ['required',new Enum(EmployeeRole::class)],
            'note' => ['nullable', 'string', 'max:1000'],
        ];
    }
}
