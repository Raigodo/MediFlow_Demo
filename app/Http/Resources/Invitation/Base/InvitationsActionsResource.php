<?php

namespace App\Http\Resources\Invitation\Base;

use App\Enums\ModalKey;
use App\Models\Invitation;
use Illuminate\Http\Request;
use App\Services\CurrentContext;
use App\Services\SelectedContext;
use Illuminate\Support\Facades\Gate;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Services\Actions\Facades\InvitationActions;

class InvitationsActionsResource extends JsonResource
{

    public function __construct() {
        parent::__construct([]);
    }

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $structure = SelectedContext::structure()
            ?? CurrentContext::structure();

        return [
            'dropdown'=> [
                'create'=> InvitationActions::create($structure),
            ],
            'list'=> InvitationActions::index($structure),
            'create'=> InvitationActions::create($structure),
            'store'=> InvitationActions::store($structure),
        ];
    }
}
