<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\User;
use Inertia\Inertia;
use App\Enums\UserRole;
use App\Enums\EmployeeRole;
use Illuminate\Http\Request;
use App\Services\CurrentContext;
use App\Services\DataAccess\Facades\Clients;
use App\Services\DataAccess\Facades\Employees;
use App\Http\Resources\Client\ClientPreviewResource;

class AppendClientSidelist
{
    public function handle(
        Request $request, 
        Closure $next,
        string $action_name
    ) {
        $clients = Clients::all();
        $user = CurrentContext::user();
        $selected_role = $request->query('role')
            ?? CurrentContext::employeeRole()
            ?? EmployeeRole::NURSE;

        Inertia::share('sidelists.clients', function () use ($clients, $user, $selected_role, $action_name) {
                return [
                    'items' => collect($clients)->map(function ($item) {
                        return new ClientPreviewResource($item);
                    }),
                    'roles'=> getAccessibleEmployeeRoles($user),
                    'role'=> $selected_role,
                    'actionKey'=> $action_name,
                ];
            });
            
        return $next($request);
    }
}




function getAccessibleEmployeeRoles(User|null $user)
{
    if (! $user){
        return [];
    }

    $employee_id = CurrentContext::employeeId();
    $employee = $employee_id ? Employees::find($employee_id) : null;

    $accessible_roles = array_filter(
        EmployeeRole::cases(),
        fn(EmployeeRole $role) =>
            ($user && CurrentContext::userRole() >= UserRole::MANAGER->value)
            || ($employee && $role->value <= $employee->role->value)
    );

    return array_map(
        fn(EmployeeRole $role) => $role,
        array_values($accessible_roles)
    );
}

