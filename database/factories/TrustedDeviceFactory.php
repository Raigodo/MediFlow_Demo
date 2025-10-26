<?php

namespace Database\Factories;

use Ramsey\Uuid\Uuid;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TrustedDevice>
 */
class TrustedDeviceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'note'=> null,
            "last_used_at"=> null,
            "last_employee_id"=> null,
            "token_value" => Uuid::uuid4()->toString(),
        ];
    }
}
