<?php

namespace Database\Seeders;

use App\Models\User;
use App\Enums\UserRole;
use Illuminate\Database\Seeder;
use App\Services\DataAccess\Facades\Users;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Users::create([
            'name'=> "Admin",
            'surname'=> "First",
            'email'=> 'admin@email.com',
            'role'=> UserRole::ADMIN,
            'password'=> 'P@55w0rd',
        ]);
    }
}
