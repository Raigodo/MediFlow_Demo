<?php

namespace App\Http\Resources\Employee\Base;

use App\Models\Employee;
use Illuminate\Http\Request;
use App\Http\Resources\User\UserPreviewResource;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Http\Resources\Structure\StructurePreviewResource;

class EmployeeDetail extends JsonResource
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
            "id"=> $this->employee->id,
            'role'=>$this->employee->role,
            'createdAt'=>$this->employee->created_at,
            'deactivatedAt'=>$this->employee->deactivated_at,
            'structure'=> new StructurePreviewResource($this->employee->structure),
            'user'=> $this->employee->user
                ? new UserPreviewResource($this->employee->user)
                : null,
        ];
    }
}
