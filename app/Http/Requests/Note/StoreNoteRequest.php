<?php

namespace App\Http\Requests\Note;

use App\Models\Medicament;
use App\Services\CurrentContext;
use Illuminate\Foundation\Http\FormRequest;
use App\Services\DataAccess\Facades\Medicaments;
use App\Services\DataAccess\Facades\Medications;

class StoreNoteRequest extends FormRequest
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
            'content' => 'required|string|max:65535',
            'is_important' => 'required|boolean',

            'ambulance_calls'=> 'array',
            'ambulance_calls.*.result'=> 'required|string|min:3|max:32',

            'diagnoses'=> 'array',
            'diagnoses.*.name'=> 'required|string|min:3|max:100',

            'measurements'=> 'array',
            'measurements.*.measurement_type_id'=> 'required|numeric',
            'measurements.*.value'=> 'required|numeric',

            
            'medications'=> 'array',
            'medications.*.medicament_type_id'=> [
                'required',
                'numeric',
            ],
            'medications.*.amount'=> [
                'required',
                'numeric',
                'min:1',
                function ($attribute, $value, $fail){
                    $medicament_type_key = str_replace('amount', 'medicament_type_id', $attribute);
                    $medicament = Medicaments::findByType($this->input($medicament_type_key));
                    if ($value > $medicament->amount) {
                        return $fail('The amount field must not be greater than '.$medicament->amount.'.');
                    }
                },
            ],
        ];
    }
}
