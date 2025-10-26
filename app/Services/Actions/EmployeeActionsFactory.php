<?php

namespace App\Services\Actions;

use App\Models\Employee;
use App\Models\Structure;
use Illuminate\Support\Facades\Gate;


class EmployeeActionsFactory
{
    public function index(Structure $structure)
    {
        return [
            'can'=> Gate::allows('list', [
                Employee::class,
            ]),
            'method'=> 'GET',
            'url'=> route('employee.index', [
                'structure'=> $structure->id,
            ]),
        ];
    }

    
    public function show(Employee $employee)
    {
        return [
            'can'=> Gate::allows('view', [
                Employee::class,
                $employee,
            ]),
            'method'=> 'GET',
            'url'=> route('employee.show', [
                'structure'=> $employee->structure_id,
                'employee'=> $employee->id,
            ]),
        ];
    }

    
    public function promote(Employee $employee)
    {
        return [
            'can'=> Gate::allows('promoteNurse', [
                Employee::class,
                $employee,
            ]),
            'method'=> 'PATCH',
            'url'=> route('employee.promote', [
                'structure'=> $employee->structure_id,
                'employee'=> $employee->id,
            ]),
        ];
    }

    
    public function demote(Employee $employee)
    {
        return [
            'can'=> Gate::allows('demoteNurse', [
                Employee::class,
                $employee,
            ]),
            'method'=> 'PATCH',
            'url'=> route('employee.demote', [
                'structure'=> $employee->structure_id,
                'employee'=> $employee->id,
            ]),
        ];
    }

    
    public function activate(Employee $employee)
    {
        return [
            'can'=> Gate::allows('activate', [
                Employee::class,
                $employee,
            ]),
            'method'=> 'PATCH',
            'url'=> route('employee.activate', [
                'structure'=> $employee->structure_id,
                'employee'=> $employee->id,
            ]),
        ];
    }

    
    public function deactivate(Employee $employee)
    {
        return [
            'can'=> Gate::allows('deactivate', [
                Employee::class,
                $employee,
            ]),
            'method'=> '',
            'url'=> route('employee.deactivate', [
                'structure'=> $employee->structure_id,
                'employee'=> $employee->id,
            ]),
        ];
    }
}
