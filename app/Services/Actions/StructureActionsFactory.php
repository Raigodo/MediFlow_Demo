<?php

namespace App\Services\Actions;

use App\Models\User;
use App\Enums\ModalKey;
use App\Models\Structure;
use Illuminate\Support\Facades\Gate;


class StructureActionsFactory 
{
    public function list(User $user)
    {
        return [
            'can'=> Gate::allows('list', [
                Structure::class,
                $user,
            ]),
            'method'=> 'GET',
            'url'=> route('structure.list', [
                'user'=> $user->id,
            ]),
        ];
    }


    public function index(Structure $structure)
    {
        return [
            'can'=> Gate::allows('view', [
                Structure::class,
                $structure,
            ]),
            'method'=> 'GET',
            'url'=> route('structure.index', [
                'structure'=> $structure->id,
            ]),
        ];
    }

    
    public function show(Structure $structure)
    {
        return [
            'can'=> Gate::allows('view', [
                Structure::class,
                $structure,
            ]),
            'method'=> 'GET',
            'url'=> route('structure.show', [
                'structure'=> $structure->id,
            ]),
        ];
    }

    
    public function create(User $user)
    {
        return [
            'can'=> Gate::allows('create', [
                Structure::class,
            ]),
            'method'=> 'GET',
            'url'=> '#',
            'metadata'=> [
                'preventRefresh'=> true,
                'modal'=> ModalKey::CREATE_STRUCTURE,
            ],
        ];
    }

    
    public function store()
    {
        return [
            'can'=> Gate::allows('create', [
                Structure::class,
            ]),
            'method'=> 'POST',
            'url'=> route('structure.store'),
        ];
    }
    
    public function edit(Structure $structure)
    {
        return [
            'can'=> Gate::allows('update', [
                Structure::class,
                $structure,
            ]),
            'method'=> 'GET',
            'url'=> route('structure.edit', [
                'structure'=> $structure->id,
            ]),
        ];
    }

    
    public function update(Structure $structure)
    {
        return [
            'can'=> Gate::allows('update', [
                Structure::class,
                $structure,
            ]),
            'method'=> 'PATCH',
            'url'=> route('structure.update', [
                'structure'=> $structure->id,
            ]),
        ];
    }

    
    public function updateIcon(Structure $structure)
    {
        return [
            'can'=> Gate::allows('update', [
                Structure::class,
                $structure,
            ]),
            'method'=> 'PUT',
            'url'=> route('structure.update.icon', [
                'structure'=> $structure->id,
            ]),
        ];
    }

    
    public function destroy(Structure $structure)
    {
        return [
            'can'=> Gate::allows('delete', [
                Structure::class,
                $structure,
            ]),
            'method'=> 'DELETE',
            'url'=> route('structure.destroy', [
                'structure'=> $structure->id,
            ]),
        ];
    }
}