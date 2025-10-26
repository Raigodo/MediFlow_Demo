<?php

namespace App\Services\Actions;

use App\Enums\ModalKey;
use App\Models\Structure;
use App\Models\Invitation;
use Illuminate\Support\Facades\Gate;


class InvitationActionsFactory
{
    public function index(Structure $structure)
    {
        return [
            'can'=> Gate::allows('list', [
                Invitation::class,
            ]),
            'method'=> 'GET',
            'url'=> route('invitation.index', [
                'structure'=> $structure->id,
            ]),
        ];
    }

    
    public function show(Invitation $invitation)
    {
        return [
            'can'=> Gate::allows('view', [
                Invitation::class,
                $invitation,
            ]),
            'method'=> 'GET',
            'url'=> route('invitation.show', [
                'structure'=> $invitation->structure_id,
                'invitation'=> $invitation->id,
            ]),
        ];
    }

    
    public function create(Structure $structure)
    {
        return [
            'can'=> Gate::allows('create', [
                Invitation::class
            ]),
            'method'=> 'GET',
            'url'=> '#',
            'metadata'=> [
                'preventRefresh'=> true,
                'modal'=> ModalKey::CREATE_INVITATION,
            ],
        ];
    }

    
    public function store(Structure $structure)
    {
        return [
            'can'=> Gate::allows('create', [
                Invitation::class,
            ]),
            'method'=> 'POST',
            'url'=> route('invitation.store', [
                'structure'=> $structure->id,
            ]),
        ];
    }

    
    public function edit(Invitation $invitation)
    {
        return [
            'can'=> Gate::allows('update', [
                Invitation::class,
                $invitation,
            ]),
            'method'=> 'GET',
            'url'=> route('invitation.edit', [
                'structure'=> $invitation->structure_id,
                'invitation'=> $invitation->id,
            ]),
        ];
    }

    
    public function update(Invitation $invitation)
    {
        return [
            'can'=> Gate::allows('update', [
                Invitation::class,
                $invitation,
            ]),
            'method'=> 'PATCH',
            'url'=> route('invitation.update', [
                'structure'=> $invitation->structure_id,
                'invitation'=> $invitation->id,
            ]),
        ];
    }

    
    public function destroy(Invitation $invitation)
    {
        return [
            'can'=> Gate::allows('delete', [
                Invitation::class,
                $invitation,
            ]),
            'method'=> 'DELETE',
            'url'=> route('invitation.destroy', [
                'structure'=> $invitation->structure_id,
                'invitation'=> $invitation->id,
            ]),
        ];
    }
}
