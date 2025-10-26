<?php

namespace App\Http\Resources\Invitation\Base;

use App\Models\Invitation;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Http\Resources\Employee\EmployeePreviewResource;
use App\Http\Resources\Structure\StructurePreviewResource;

class InvitationDetail extends JsonResource
{

    public function __construct(
        protected Invitation|BelongsTo $invitation
    ) {
        parent::__construct($invitation);
    }

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id"=> $this->invitation->id,
            'role'=> $this->invitation->role,
            'tokenValue'=> $this->invitation->token_value,
            'createdAt'=> $this->invitation->created_at,
            'note'=> $this->invitation->note,
            'createdEmployee'=> $this->invitation->created_employee
                ? new EmployeePreviewResource($this->invitation->created_employee)
                : null,
            'structure'=> new StructurePreviewResource($this->invitation->structure),
        ];
    }
}
