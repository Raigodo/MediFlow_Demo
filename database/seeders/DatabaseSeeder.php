<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call(MeasurementTypeSeeder::class);
        $this->call(MedicamentTypeSeeder::class);
        $this->call(UserSeeder::class);
        $this->call(DevSeeder::class);
    }
}
