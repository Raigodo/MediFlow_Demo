<?php

namespace App\Http\Resources\Invitation;

use App\Models\Invitation;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Http\Resources\Employee\EmployeePreviewResource;
use App\Http\Resources\Invitation\Base\InvitationPreview;
use App\Http\Resources\Structure\StructurePreviewResource;
use App\Http\Resources\Invitation\Base\InvitationActionsResource;

class InvitationPreviewResource extends JsonResource
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
            'data'=> new InvitationPreview($this->invitation),
            'actions'=> new InvitationActionsResource($this->invitation),
        ];
    }
}
