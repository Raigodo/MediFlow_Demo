<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Services\CurrentContext;
use App\Services\DataAccess\Facades\Employees;
use App\Services\DataAccess\Facades\Structures;
use App\Services\DataAccess\Facades\MedicamentManagers;
use App\Http\Resources\Employee\EmployeePreviewPagination;

class EmployeeController extends Controller
{

    public function index(Request $request, $structure_id)
    {
        $filter = [
            'created_from'=> $request->query('created_from'),
            'created_to'=> $request->query('created_to'),
            'archived' => $request->query('archived'),
            'archived_from'=> $request->query('archived_from'),
            'archived_to'=> $request->query('archived_to'),
            'page' => $request->query('page'),
        ];

        $employees = Employees::paginated($filter);

        return Inertia::render("structures/employees/index",[
            'collections.paginated'=> [
                'employees'=> new EmployeePreviewPagination(
                    $employees,
                    $filter,
                ),
            ],
        ]);
    }

    public function show($structure_id, $employee_id)
    {
        return Inertia::render("structures/employees/show");
    }

    public function promoteNurse($structure_id, $employee_id)
    {
        MedicamentManagers::create($structure_id, [
            'structure_id'=> $structure_id,
            'employee_id'=> $employee_id,
        ]);
        return back()->with('message', 'Nurse promoted');
    }

    public function demoteNurse($structure_id, $employee_id)
    {
        MedicamentManagers::delete($structure_id, $employee_id);
        return back()->with('message', 'Nurse demoted');
    }

    public function deactivate($structure_id, $employee_id)
    {
        Employees::update($employee_id, [
            'deactivated_at'=> now(),
        ]);
        return back()->with('message', 'Employee deactivated');
    }

    public function activate($structure_id, $employee_id)
    {
        Employees::update($employee_id, [
            'deactivated_at'=> null,
        ]);
        return back()->with('message', 'Employee activated');
    }
}
