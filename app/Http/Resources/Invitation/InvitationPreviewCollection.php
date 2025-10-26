<?php

namespace App\Http\Resources\Invitation;

use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Http\Resources\Json\ResourceCollection;
use App\Http\Resources\Invitation\Base\InvitationsActionsResource;

class InvitationPreviewCollection extends ResourceCollection
{

    public function __construct(
        protected null|Collection|HasMany $invitations
    ) {
        parent::__construct($invitations ?? []);
    }

    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'data'=> $this->collection->toArray(),
            'actions'=> new InvitationsActionsResource(),
        ];
    }
}
