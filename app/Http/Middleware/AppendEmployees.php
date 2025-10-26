<?php

namespace App\Http\Middleware;

use App\Http\Resources\Employee\EmployeePreviewCollection;
use Closure;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Services\CurrentContext;
use App\Services\DataAccess\Facades\Employees;

class AppendEmployees
{
    public function handle(
        Request $request, 
        Closure $next,
    ) {
        $structure_id = CurrentContext::structureId();
        $employees = Employees::all();

        Inertia::share('collections.employees', function () use ($employees) {
                return new EmployeePreviewCollection($employees);
            });
            
        return $next($request);
    }
}

