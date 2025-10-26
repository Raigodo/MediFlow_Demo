<?php

namespace App\Http\Resources\Session;

use App\Enums\UserRole;
use App\Enums\EmployeeRole;
use Illuminate\Http\Request;
use App\Services\CurrentContext;
use App\Services\SelectedContext;
use App\Services\DataAccess\Facades\Users;
use App\Services\Actions\Facades\AppActions;
use App\Services\Actions\Facades\NoteActions;
use App\Services\Actions\Facades\UserActions;
use App\Services\DataAccess\Facades\Employees;
use App\Services\Actions\Facades\ClientActions;
use App\Services\DataAccess\Facades\Structures;
use App\Http\Resources\User\UserPreviewResource;
use App\Services\DataAccess\Facades\Medicaments;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Services\Actions\Facades\StructureActions;
use App\Services\Actions\Facades\MedicamentActions;
use App\Services\DataAccess\Facades\MedicamentTypes;
use App\Services\DataAccess\Facades\MeasurementTypes;
use App\Http\Resources\Employee\EmployeePreviewResource;
use App\Http\Resources\Structure\StructureDetailResource;
use App\Http\Resources\Structure\StructurePreviewCollection;
use App\Http\Resources\Medicament\MedicamentPreviewCollection;
use App\Http\Resources\Medicament\MedicamentTypePreviewCollection;
use App\Http\Resources\Measurement\MeasurementTypePreviewCollection;

class SessionResource extends JsonResource
{

    public function __construct() {
        parent::__construct(null);
    }

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $user_id = CurrentContext::userId();
        $user = $user_id ? Users::findDetail($user_id) : null;

        $structure_id = CurrentContext::structureId();
        $structure = $structure_id ? Structures::findDetail($structure_id) : null;

        $employee_id = CurrentContext::employeeId();
        $employee = $employee_id ? Employees::findDetail($employee_id) : null;

        $alterable_structures = null;
        if ($user && $user->role->value >= UserRole::MANAGER->value){
            $user_id = CurrentContext::userId();
            $alterable_structures = Structures::participating($user_id);
        }

        $medicaments = $employee && $employee->role->value >= EmployeeRole::NURSE->value
            ? Medicaments::all()
            : null;
                
        $measurementTypes = MeasurementTypes::all();
        $medicamentTypes =  MedicamentTypes::all();

        $selected_client = SelectedContext::client();

        return [
            'actions'=> new SessionActionsResource(),
            'data'=> [
                'user'=> $user
                    ? new UserPreviewResource($user)
                    : null,
                'medicaments'=> $medicaments
                    ? new MedicamentPreviewCollection($medicaments)
                    :null,
                'structure'=> $structure
                    ? new StructureDetailResource($structure)
                    : null,
                'employee'=> $employee
                    ? new EmployeePreviewResource($employee)
                    : null,
                'structures'=> $user
                    ? new StructurePreviewCollection($alterable_structures)
                    : null,
                'medicamentTypes'=> $user
                    ? new MedicamentTypePreviewCollection($medicamentTypes)
                    : null,
                'measurementTypes'=> $user
                    ? new MeasurementTypePreviewCollection($measurementTypes)
                    : null,
                'breadcrumb'=> [
                    //
                ],
                'toolbar'=> [
                    'home'=> AppActions::home(),
                    'items'=> [
                        'client'=> $selected_client
                            ? ClientActions::show($selected_client)
                            : ClientActions::prompt(),
                        'journal'=> $selected_client
                            ? NoteActions::index($selected_client)
                            : NoteActions::prompt(),
                        'medicament'=> MedicamentActions::index(),
                        'structure'=> $structure 
                            ? StructureActions::index($structure)
                            : null,
                        'admin'=> UserActions::index(),
                    ]
                ]
            ],
        ];
    }
}