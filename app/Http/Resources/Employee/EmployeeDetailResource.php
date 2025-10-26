<?php

namespace App\Http\Resources\Employee;

use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Employee\Base\EmployeeDetail;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Http\Resources\Employee\Base\EmployeeActionsResource;

class EmployeeDetailResource extends JsonResource
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
        return [
            'data'=> new EmployeeDetail($this->employee),
            'actions'=> new EmployeeActionsResource($this->employee),
        ];
    }
}
