<?php

namespace Database\Seeders;

use App\Models\MeasurementType;
use Illuminate\Database\Seeder;

class MeasurementTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = fake()->unique();
        $options = ['m', 'kg', 'bpm', '°C'];

        for ($i = 1; $i <= 20; $i++) {
            MeasurementType::factory()->create([
                'name'=> $faker->word(),
                'units'=> $options[array_rand($options)],
            ]);
        }
    }
}
