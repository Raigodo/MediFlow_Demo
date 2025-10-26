<?php

namespace Database\Seeders;

use App\Models\MedicamentType;
use Illuminate\Database\Seeder;

class MedicamentTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = fake()->unique();
        $options = ['pill', 'mg', 'ml'];

        for ($i = 1; $i <= 20; $i++) {
            MedicamentType::factory()->create([
                'name'=> $faker->word(),
                'form'=> $options[array_rand($options)],
            ]);
        }
    }
}
