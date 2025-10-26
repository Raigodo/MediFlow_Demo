<?php

namespace App\Services\Actions;

use App\Models\Client;
use App\Enums\ModalKey;
use App\Models\Structure;
use Illuminate\Support\Facades\Gate;


class ClientActionsFactory
{
    public function index(Structure $structure)
    {
        return [
            'can'=> Gate::allows('list', [
                Client::class,
                $structure,
            ]),
            'method'=> 'GET',
            'url'=> route('client.index', [
                'structure'=> $structure->id,
            ]),
        ];
    }


    public function archived(Structure $structure)
    {
        return [
            'can'=> Gate::allows('list', [
                Client::class,
                $structure,
            ]),
            'method'=> 'GET',
            'url'=> route('client.archived', [
                'structure'=> $structure->id,
            ]),
        ];
    }


    public function active(Structure $structure)
    {
        return [
            'can'=> Gate::allows('list', [
                Client::class,
                $structure,
            ]),
            'method'=> 'GET',
            'url'=> route('client.index', [
                'structure'=> $structure->id,
            ]),
        ];
    }


    public function prompt()
    {
        return [
            'can'=> Gate::allows('prompt', [
                Client::class,
            ]),
            'method'=> 'GET',
            'url'=> route('client.prompt'),
        ];
    }

    
    public function show(Client $client)
    {
        return [
            'can'=> Gate::allows('view', [
                Client::class,
                $client,
            ]),
            'method'=> 'GET',
            'url'=> route('client.show', [
                'client'=> $client->id,
            ]),
        ];
    }

    
    public function showData(Client $client)
    {
        return [
            'can'=> Gate::allows('view', [
                Client::class,
                $client,
            ]),
            'method'=> 'GET',
            'url'=> route('client.data', [
                'client'=> $client->id,
            ]),
        ];
    }

    
    public function create(Structure $structure)
    {
        return [
            'can'=> Gate::allows('create', [
                Client::class,
                $structure,
            ]),
            'method'=> 'GET',
            'url'=> '#',
            'metadata'=> [
                'preventRefresh'=> true,
                'modal'=> ModalKey::CREATE_CLIENT,
            ],
        ];
    }

    
    public function store()
    {
        return [
            'can'=> Gate::allows('create', [
                Client::class,
            ]),
            'method'=> 'POST',
            'url'=> route('client.store'),
        ];
    }

    
    public function edit(Client $client)
    {
        return [
            'can'=> Gate::allows('update', [
                Client::class,
                $client,
            ]),
            'method'=> 'GET',
            'url'=> route('client.edit', [
                'client'=> $client->id,
            ]),
        ];
    }

    
    public function update(Client $client)
    {
        return [
            'can'=> Gate::allows('update', [
                Client::class,
                $client,
            ]),
            'method'=> 'PATCH',
            'url'=> route('client.update', [
                'client'=> $client->id,
            ]),
        ];
    }

    
    public function updateIcon(Client $client)
    {
        return [
            'can'=> Gate::allows('update', [
                Client::class,
                $client,
            ]),
            'method'=> 'PUT',
            'url'=> route('client.update.icon', [
                'client'=> $client->id,
            ]),
        ];
    }

    
    public function archive(Client $client)
    {
        return [
            'can'=> Gate::allows('archive', [
                Client::class,
                $client,
            ]),
            'method'=> 'PATCH',
            'url'=> route('client.archive', [
                'client'=> $client->id,
            ]),
        ];
    }

    
    public function unarchive(Client $client)
    {
        return [
            'can'=> Gate::allows('unarchive', [
                Client::class,
                $client,
            ]),
            'method'=> 'PATCH',
            'url'=> route('client.unarchive', [
                'client'=> $client->id,
            ]),
        ];
    }
}