<?php

use App\Models\Employee;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmployeeController;

Route::prefix("structures/{structure}/employees")
    ->middleware(['auth','trusted','verified'])
    ->group(function ()
    {

        Route::get('/', [EmployeeController::class, 'index'])
            ->middleware([
                'can:list,'.Employee::class,
                'select.structure',
            ])
            ->name('employee.index');
            

        Route::get('{employee}', [EmployeeController::class,'show'])
            ->middleware([
                'can:view,'.Employee::class.',employee',
                'select.structure',
                'select.employee',
            ])
            ->name('employee.show');


        Route::patch('{employee}/promote-nurse', [EmployeeController::class,'promoteNurse'])
            ->middleware('can:promoteNurse,'.Employee::class.',employee')
            ->name('employee.promote');


        Route::patch('{employee}/demote-nurse', [EmployeeController::class,'demoteNurse'])
            ->middleware('can:demoteNurse,'.Employee::class.',employee')
            ->name('employee.demote');
            

        Route::patch('{employee}/activate', [EmployeeController::class,'activate'])
            ->middleware('can:activate,'.Employee::class.',employee')
            ->name('employee.activate');


        Route::patch('{employee}/deactivate', [EmployeeController::class,'deactivate'])
            ->middleware('can:deactivate,'.Employee::class.',employee')
            ->name('employee.deactivate');

    });

