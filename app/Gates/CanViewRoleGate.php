<?php

namespace App\Gates;

use App\Models\User;
use App\Enums\UserRole;
use App\Enums\EmployeeRole;
use App\Services\CurrentContext;

class CanViewRoleGate
{
    /**
     * Determine if the user can view other users resource based on role hierarchy.
     *
     * @param  User|null  $user
     * @param  UserRole|EmployeeRole $role
     * @return bool
     */
    public function __invoke(?User $user = null, UserRole|EmployeeRole $role): bool
    {
        if ($user === null) {
            return false;
        }

        if ($role instanceof UserRole){
            return CurrentContext::userRole() >= $role->value;
        }

        if ($role instanceof EmployeeRole){
            if (CurrentContext::userRole() >= UserRole::MANAGER->value){
                return true;
            }

            return CurrentContext::employeeRole() === $role->value;
        }

        return false;
    }
}
