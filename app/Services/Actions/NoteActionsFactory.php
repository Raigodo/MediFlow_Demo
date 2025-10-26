<?php

namespace App\Services\Actions;

use App\Models\Note;
use App\Models\Client;
use Illuminate\Support\Facades\Gate;


class NoteActionsFactory
{
    public function prompt()
    {
        return [
            'can'=> Gate::allows('prompt', [
                Note::class,
            ]),
            'method'=> 'GET',
            'url'=> route('note.prompt'),
        ];
    }


    public function index(Client $client)
    {
        return [
            'can'=> Gate::allows('list', [
                Note::class,
                $client,
            ]),
            'method'=> 'GET',
            'url'=> route('note.index', [
                'client'=> $client->id,
            ]),
        ];
    }

    
    public function show(Note $note)
    {
        return [
            'can'=> Gate::allows('view', [
                Note::class,
                $note->client,
                $note,
            ]),
            'method'=> 'GET',
            'url'=> route('note.show', [
                'client'=> $note->client_id,
                'note'=> $note->id,
            ]),
        ];
    }

    
    public function write(Client $client)
    {
        return [
            'can'=> Gate::allows('create', [
                Note::class,
                $client,
            ]),
            'method'=> 'GET',
            'url'=> route('note.write', [
                'client'=> $client->id,
            ]),
        ];
    }

    
    public function store(Client $client)
    {
        return [
            'can'=> Gate::allows('create', [
                Note::class,
                $client,
            ]),
            'method'=> 'PUT',
            'url'=> route('note.store', [
                'client'=> $client->id,
            ]),
        ];
    }

    
    public function forceEdit(Note $note)
    {
        return [
            'can'=> Gate::allows('forceUpdate', [
                Note::class,
                $note->client,
                $note,
            ]),
            'method'=> 'GET',
            'url'=> route('note.force-edit', [
                'client'=> $note->client_id,
                'note'=> $note->id,
            ]),
        ];
    }

    
    public function forceUpdate(Note $note)
    {
        return [
            'can'=> Gate::allows('forceUpdate', [
                Note::class,
                $note->client,
                $note,
            ]),
            'method'=> 'PUT',
            'url'=> route('note.force-update', [
                'client'=> $note->client_id,
                'note'=> $note->id,
            ]),
        ];
    }

    
    public function destroy(Note $note)
    {
        return [
            'can'=> Gate::allows('delete', [
                Note::class,
                $note->client,
                $note,
            ]),
            'method'=> 'DELETE',
            'url'=> route('note.destroy', [
                'client'=> $note->client_id,
                'note'=> $note->id,
            ]),
        ];
    }
}