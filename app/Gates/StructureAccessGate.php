<?php

namespace App\Gates;

use App\Models\User;
use App\Enums\UserRole;
use App\Services\CurrentContext;
use Illuminate\Http\Request;
use App\Services\DataAccess\Facades\Employees;
use App\Services\DataAccess\Facades\TrustedDevices;

class StructureAccessGate
{
    /**
     * Determine if the user can access the structure.
     *
     * @param  \App\Models\User|null  $user
     * @param  \Illuminate\Http\Request|null  $request
     * @return bool
     */
    public function __invoke(?User $user = null, ?Request $request = null): bool
    {
        if ($user) {
            $is_manager = CurrentContext::userRole() >= UserRole::MANAGER->value;
            $is_admin = !!CurrentContext::adminId();

            if ($is_manager || $is_admin) {
                return true;
            }
        }

        $device_token_value = $request->cookie("device_token");
        if ($device_token_value)
        {
            $device = TrustedDevices::findByToken($device_token_value);
            if ($device && CurrentContext::userRole() === UserRole::EMPLOYEE->value) {
                $employee_id = CurrentContext::employeeId();
                $employee = $employee_id ? Employees::findDetail($employee_id) : null;
                if ($employee)
                {
                    TrustedDevices::update($device->id, [
                        'last_used_at'=> now(),
                        'last_employee_id'=> $employee_id,
                    ]);
                    return true;
                }
            }
        }

        return false;
    }
}
