<?php

namespace App\Http\Resources\Invitation\Base;

use App\Models\Invitation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Services\Actions\Facades\InvitationActions;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class InvitationActionsResource extends JsonResource
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
        $invitation = $this->invitation;

        return [
            'dropdown'=> [
                'edit'=> InvitationActions::edit($invitation),
                'destroy'=> InvitationActions::destroy($invitation),
            ],
            'show'=> InvitationActions::show($invitation),
            'edit'=> InvitationActions::edit($invitation),
            'update'=> InvitationActions::update($invitation),
            'destroy'=> InvitationActions::destroy($invitation),
        ];
    }
}
