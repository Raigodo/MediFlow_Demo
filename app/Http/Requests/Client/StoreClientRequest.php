<?php

namespace App\Http\Requests\Client;

use App\Enums\InvalidityType;
use App\Enums\InvalidityGroup;
use Illuminate\Validation\Rules\Enum;
use Illuminate\Foundation\Http\FormRequest;

class StoreClientRequest extends FormRequest
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
        if ($this->has('invalidity_group')) {
            $invalidity_group = InvalidityGroup::tryFrom($this->input('invalidity_group'));
            $this->merge(['invalidity_group' => $invalidity_group->value]);
        }
        if ($this->has('invalidity_type')) {
            $invalidity_type = InvalidityType::tryFrom($this->input('invalidity_type'));
            $this->merge(['invalidity_type' => $invalidity_type->value]);
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
            'id'                    => ['required','string','min:2','max:50'],
            'name'                  => ['required', 'string', 'min:2', 'max:50', 'regex:/^[\pL\s\-]+$/u'],
            'surname'               => ['required', 'string', 'min:2', 'max:50', 'regex:/^[\pL\s\-]+$/u'],
            'birth_date'            => ['required', 'date', 'before:today'],
            'personal_code'         => ['required', 'string', 'regex:/^[0-9]{6}-[0-9]{5}$/'],
            'language'              => ['required', 'string', 'min:2', 'max:50'],
            'religion'              => ['required', 'string', 'min:2', 'max:50'],
            'height'                => ['required', 'numeric', 'min:0', 'max:300'],
            'weight'                => ['required', 'numeric', 'min:0', 'max:1000'],
            'invalidity_group'      => ['nullable', new Enum(InvalidityGroup::class)],
            'invalidity_type'       => ['nullable', new Enum(InvalidityType::class)],
            'invalidity_expires_on' => ['nullable', 'date', 'after_or_equal:today'],
        ];
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            $group     = $this->input('invalidity_group');
            $type      = $this->input('invalidity_type');
            $expiresOn = $this->input('invalidity_expires_on');

            if ($group && $group !== InvalidityGroup::NONE->value) {
                // if group is set, type + expiry are required
                if (! $type) {
                    $validator->errors()->add('invalidity_type', 'Invalidity type is required when invalidity group is specified.');
                }
                if (! $expiresOn) {
                    $validator->errors()->add('invalidity_expires_on', 'Invalidity expiration date is required when invalidity group is specified.');
                }
            } else {
                // if group not set, type + expiry must be null
                if (!($type === null || $type === InvalidityType::NONE->value)) {
                    $validator->errors()->add('invalidity_type', 'Invalidity type must not be specified when no invalidity group is set.');
                }
                if ($expiresOn !== null) {
                    $validator->errors()->add('invalidity_expires_on', 'Invalidity expiration date must not be specified when no invalidity group is set.');
                }
            }
        });
    }
}
