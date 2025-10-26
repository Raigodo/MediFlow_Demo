<?php

namespace App\Http\Requests\Medicament;

use Illuminate\Foundation\Http\FormRequest;

class BatchStoreMedicamentRequest extends FormRequest
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
        //
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'medicaments'=>'array',
            'medicaments.*.medicament_type_id'=> 'required|numeric',
            'medicaments.*.amount'=> 'required|numeric|min:1',
        ];
    }
}
