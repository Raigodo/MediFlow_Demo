<?php

namespace App\Casts;

use Illuminate\Support\Facades\Crypt;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Database\Eloquent\CastsAttributes;

class EncryptedEnum implements CastsAttributes
{

    public function __construct(protected string $enumClass) {}

    /**
     * Cast the given value.
     *
     * @param  array<string, mixed>  $attributes
     */
    public function get(Model $model, string $key, mixed $value, array $attributes): mixed
    {
        $decrypted = Crypt::decryptString($value);
        return $this->enumClass::from($decrypted);

    }

    /**
     * Prepare the given value for storage.
     *
     * @param  array<string, mixed>  $attributes
     */
    public function set(Model $model, string $key, mixed $value, array $attributes): mixed
    {
        $rawValue = $value instanceof $this->enumClass ? $value->value : $value;
        return Crypt::encryptString($rawValue);
    }
}
