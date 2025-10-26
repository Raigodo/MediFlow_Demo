<?php

namespace App\Http\Resources\Employee\Base;

use App\Models\Employee;
use App\Services\Actions\Facades\EmployeeActions;
use App\Services\Actions\Facades\SessionActions;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class EmployeeActionsResource extends JsonResource
{

    public function __construct(
        protected Employee|BelongsTo $employee
    ) {
        parent::__construct($employee);
    }

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $employee = $this->employee;

        return [
            'dropdown'=> [
                'activate'=> EmployeeActions::activate($employee),
                'deactivate'=> EmployeeActions::deactivate($employee),
                'promoteNurse'=> EmployeeActions::promote($employee),
                'demoteNurse'=> EmployeeActions::demote($employee),
                'alter'=> SessionActions::alter($employee->user),
                'alterReset'=> SessionActions::alterReset(),
            ],
            'show'=> EmployeeActions::show($employee),
            'activate'=> EmployeeActions::activate($employee),
            'deactivate'=> EmployeeActions::deactivate($employee),
            'promoteNurse'=> EmployeeActions::promote($employee),
            'demoteNurse'=> EmployeeActions::demote($employee),
            'alter'=> SessionActions::alter($employee->user),
            'alterReset'=> SessionActions::alterReset(),
        ];
    }
}
