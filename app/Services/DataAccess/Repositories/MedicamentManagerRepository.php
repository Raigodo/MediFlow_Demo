<?php

namespace App\Services\DataAccess\Repositories;

use App\Models\Medicament;
use App\Models\MedicamentManager;

class MedicamentManagerRepository 
{

    public function all(string $structure_id)
    {
        return MedicamentManager::with([
                'employee',
                'employee.structure',
                'employee.user',
                'structure',
                'structure.managers',
                'structure.managers.user',
                'structure.managers.structure',
            ])
            ->where([
                'structure_id'=> $structure_id,
            ])
            ->get();
    }

    public function find(string $employee_id)
    {
        return MedicamentManager::with([
                'employee',
                'employee.structure',
                'employee.user',
                'structure',
                'structure.managers',
                'structure.managers.user',
                'structure.managers.structure',
            ])->where([
                'employee_id'=> $employee_id,
            ])->first();
    }

    public function create(array $data)
    {   
        return MedicamentManager::factory()->create($data);
    }

    public function delete(string $employee_id)
    {
        $record = MedicamentManager::where([
            'employee_id'=> $employee_id,
        ])->first() ?? abort(404);
        
        if ($record) {
            return $record->delete();
        }

        return false;
    }
}