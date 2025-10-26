<?php

namespace App\Policies;

use App\Models\User;
use App\Enums\UserRole;
use App\Models\Employee;
use App\Models\Structure;
use App\Enums\EmployeeRole;
use App\Services\CurrentContext;
use Illuminate\Support\Facades\Gate;
use App\Services\DataAccess\Facades\Employees;
use App\Services\DataAccess\Facades\MedicamentManagers;

class EmployeePolicy
{

    public function list(User $user)
    {
        return Gate::authorize('view', [
            Structure::class,
            CurrentContext::structureId(),
        ]);
    }

    public function view(User $user, $employee)
    {
        $employee_model = $employee instanceof Employee
            ? $employee
            : Employees::find($employee) ?? abort(404);
        
        $is_admin = !!CurrentContext::adminId();
        if ($is_admin) return true;
        
        $same_structure = $employee_model->structure_id === CurrentContext::structureId();
        return $same_structure;
    }


    public function update(User $user, $employee)
    {
        $employee_model = $employee instanceof Employee
            ? $employee
            : Employees::find($employee) ?? abort(404);
        
        $same_structure = $employee_model->structure_id === CurrentContext::structureId();
        $is_admin = !!CurrentContext::adminId();
        $is_manager = CurrentContext::userRole() >= UserRole::MANAGER->value;
        
        return ($is_manager || $is_admin) && $same_structure;
    }


    public function activate(User $user, $employee)
    {
        $employee_model = $employee instanceof Employee
            ? $employee
            : Employees::find($employee) ?? abort(404);

        $can_update = Gate::allows('update',[
            Employee::class,
            $employee
        ]);
        $is_active = $employee_model->deactivated_at !== null;
        return $can_update && $is_active;
    }


    public function deactivate(User $user, $employee)
    {
        $employee_model = $employee instanceof Employee
            ? $employee
            : Employees::find($employee) ?? abort(404);

        $can_update = Gate::allows('update',[
            Employee::class,
            $employee
        ]);
        $is_active = $employee_model->deactivated_at !== null;
        return $can_update && !$is_active;
    }


    public function promoteNurse(User $user, $employee)
    {
        $employee_model = $employee
            ? $employee 
            : Employees::find($employee) ?? abort(404);

        $employee_id = $employee_model->id;

        $can_update = Gate::allows('update',[
            Employee::class,
            $employee_model
        ]);
        $employee_is_nurse = $employee_model->role === EmployeeRole::NURSE;
        $medicament_manager = $employee_id
            ? MedicamentManagers::find($employee_id)
            : null;

        return $employee_is_nurse && !$medicament_manager && $can_update;
    }


    public function demoteNurse(User $user, $employee)
    {
        $employee_model = $employee
            ? $employee 
            : Employees::find($employee) ?? abort(404);

        $employee_id = $employee_model->id;

        $can_update = Gate::allows('update',[
            Employee::class,
            $employee_model
        ]);
        $employee_is_nurse = $employee_model->role === EmployeeRole::NURSE;
        $medicament_manager = $employee_id
            ? MedicamentManagers::find($employee_id)
            : null;

        return $employee_is_nurse && $medicament_manager && $can_update;
    }

}
