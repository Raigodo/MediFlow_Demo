<?php

namespace App\Policies;

use App\Models\Medicament;
use App\Models\User;
use App\Enums\UserRole;
use App\Models\Structure;
use App\Services\CurrentContext;
use Illuminate\Support\Facades\Gate;
use App\Services\DataAccess\Facades\Medicaments;
use App\Services\DataAccess\Facades\MedicamentManagers;

class MedicamentPolicy
{

    public function list(User $user)
    {
        $employee_id = CurrentContext::employeeId();
        $medicament_manager = $employee_id
            ? MedicamentManagers::find($employee_id)
            : null;
        
        $is_admin = !!CurrentContext::adminId();
        $is_medicament_manager = $medicament_manager !== null;
        $is_manager = CurrentContext::userRole() >= UserRole::MANAGER->value;
        $has_structure = !!CurrentContext::structureId();

        return $has_structure && ($is_manager || $is_medicament_manager || $is_admin) 
            && Gate::authorize('view', [
                Structure::class,
                CurrentContext::structureId(),
            ]);
    }

    public function supply(User $user)
    {
        $employee_id = CurrentContext::employeeId();
        $medicament_manager = $employee_id
            ? MedicamentManagers::find($employee_id)
            : null;

        $is_admin = !!CurrentContext::adminId();
        $has_structure = !!CurrentContext::structureId();

        return $has_structure && ($medicament_manager || $is_admin) 
            && Gate::authorize('view', [
                Structure::class,
                CurrentContext::structureId(),
            ]);
    }

    public function view(User $user, $medicament)
    {
        $medicament_model = $medicament instanceof Medicament
            ? $medicament
            : Medicaments::find($medicament) ?? abort(404);
            
        $employee_id = CurrentContext::employeeId();
        $medicament_manager = $employee_id
            ? MedicamentManagers::find($employee_id)
            : null;
        
        $same_structure = $medicament_model->structure_id === CurrentContext::structureId();
        $is_admin = !!CurrentContext::adminId();
        $is_medicament_manager = $medicament_manager !== null;
        $is_manager = CurrentContext::userRole() >= UserRole::MANAGER->value;
        $has_structure = !!CurrentContext::structureId();

        return $has_structure && $same_structure 
            && ($is_manager || $is_medicament_manager || $is_admin) 
            && Gate::authorize('view', [
                Structure::class,
                CurrentContext::structureId(),
            ]);
    }

}
