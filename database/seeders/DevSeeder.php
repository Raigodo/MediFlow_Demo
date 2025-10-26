<?php

namespace Database\Seeders;

use Str;
use Carbon\Carbon;
use App\Models\Note;
use App\Models\Client;
use App\Enums\UserRole;
use App\Models\Manager;
use App\Models\Diagnose;
use App\Models\Employee;
use App\Models\Structure;
use App\Models\Medicament;
use App\Models\Medication;
use App\Enums\EmployeeRole;
use App\Models\Measurement;
use App\Enums\InvalidityType;
use App\Models\AmbulanceCall;
use App\Models\ClientContact;
use App\Enums\InvalidityGroup;
use Illuminate\Database\Seeder;
use App\Models\DefaultStructure;
use App\Models\MedicamentManager;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Services\DataAccess\Facades\Users;

class DevSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::transaction(function () {

            Log::info('seeding structure');

            $structure =  Structure::factory()->create([
                'name'=> fake()->name(),
            ]);

            Log::info('seeding user');

            $user_manager = Users::create([
                    "name" => "Manager",
                    'surname' => 'First',
                    "email" => "manager@email.com",
                    "password" => "P@55w0rd",
                    'email_verified_at'=> now(),
                    "role"=> UserRole::MANAGER,
                ]);

            $user_employee = Users::create([
                    "name" => "Nurse",
                    'surname' => 'First',
                    "email" => "nurse@email.com",
                    "password" => "P@55w0rd",
                    'email_verified_at'=> now(),
                    "role"=> UserRole::EMPLOYEE,
                ]);

            Log::info('seeding manager');

            Manager::factory()->create([
                "user_id"=> $user_manager->id,
                "structure_id"=> $structure->id,
            ]);

            Log::info('seeding manager');

            DefaultStructure::factory()->create([
                'structure_id'=> $structure->id,
                'user_id'=> $user_manager->id,
            ]);

            Log::info('seeding clients');

            $clients = [];

            foreach ([1, 2, 3] as $index) {
                $name_parts = explode(' ', fake()->name());
                $client = Client::factory()->create([
                    'id' => $index.'-client',
                    'name'=> $name_parts[0],
                    'surname'=> $name_parts[1],
                    'birth_date'=> fake()
                        ->dateTimeBetween('-80 years', '-10 years')
                        ->format('Y-m-d'),
                    'personal_code'=> '000000-00000',
                    'language'=> Str::random(10),
                    'religion'=> Str::random(10),
                    'weight'=> 80,
                    'height'=> 170,
                    'structure_id' => $structure->id,
                    'invalidity_group'=> InvalidityGroup::NONE,
                    'invalidity_type'=> InvalidityType::NONE,
                    'invalidity_expires_on'=> null,
                ]);

                $clients[] = $client;
            }

            Log::info('seeding employees');

            $employee = Employee::factory()->create([
                'role'=> EmployeeRole::NURSE,
                'structure_id'=> $structure->id,
                'user_id' => $user_employee->id,
            ]);

            MedicamentManager::factory()->create([
                'employee_id'=> $employee,
                'structure_id'=> $structure,
            ]);

            Log::info('seeding client contacts');

            foreach($clients as $client_index => $client){
                for ($i=0; $i < $client_index; $i++) {
                    ClientContact::factory()->create([
                        'title'=> fake()->title(),
                        'phone_number'=> fake()->phoneNumber(),
                        "client_id" => $client->id,
                    ]);
                }
            }

            Log::info('seeding notes');

            foreach (range(1, 50) as $i) {
                Note::factory()->create([
                    'content'=> fake()->paragraph(),
                    'is_important'=> fake()->boolean(),
                    'client_id' => $clients[0]->id,
                    'creator_id' => $employee->id,
                    'created_at'=> Carbon::today()->subDays($i),
                ]);
            }

            Log::info('seeding medicaments');

            Medicament::factory()->create([
                'amount'=> 10,
                'structure_id'=> $structure->id,
                'medicament_type_id'=> 1,
            ]);

            Log::info('seeding diagnoses');

            $note = Note::first();

            Diagnose::factory()->create([
                'client_id'=> $clients[0]->id,
                'creator_id'=> $employee->id,
                'name'=> 'test diagnose',
                'note_id'=> $note->id,
            ]);

            Log::info('seeding diagnoses');

            AmbulanceCall::factory()->create([
                'client_id'=> $clients[0]->id,
                'creator_id'=> $employee->id,
                'result'=> 'idk',
                'note_id'=> $note->id,
            ]);

            Log::info('seeding measurements');

            Measurement::factory()->create([
                'client_id'=> $clients[0]->id,
                'creator_id'=> $employee->id,
                'measurement_type_id'=> 1,
                'value'=> 100,
                'note_id'=> $note->id,
            ]);

            Log::info('seeding medications');

            Medication::factory()->create([
                'client_id'=> $clients[0]->id,
                'creator_id'=> $employee->id,
                'medicament_type_id'=> 1,
                'amount'=> 10,
                'note_id'=> $note->id,
            ]);

        });
    }
}
