<?php

namespace App\Services\Actions;

use App\Models\Client;
use App\Enums\ModalKey;
use App\Models\Diagnose;
use App\Enums\NoteSection;
use Illuminate\Support\Facades\Gate;


class DiagnoseActionsFactory
{
    public function index(Client $client)
    {
        return [
            'can'=> Gate::allows('list', [
                Diagnose::class,
                $client,
            ]),
            'method'=> 'GET',
            'url'=> route('diagnose.index', [
                'client'=> $client->id,
            ]),
        ];
    }

    
    public function show(Diagnose $diagnose)
    {
        return [
            'can'=> Gate::allows('view', [
                Diagnose::class,
                $diagnose->client,
                $diagnose,
            ]),
            'method'=> 'GET',
            'url'=> route('note.show', [
                'client'=> $diagnose->client_id,
                'note'=> $diagnose->note_id,
                'diagnose'=> $diagnose->id,
            ]),
        ];
    }

    
    public function create(Client $client)
    {
        return [
            'can'=> Gate::allows('create', [
                Diagnose::class,
                $client,
            ]),
            'method'=> 'GET',
            'url'=> route('note.write', [
                'client'=> $client,
                'section'=> NoteSection::DIAGNOSES,
                'modal'=> ModalKey::CREATE_DIAGNOSE,
            ]),
        ];
    }

    
    public function edit(Diagnose $diagnose)
    {
        return [
            'can'=> Gate::allows('update', [
                Diagnose::class,
                $diagnose->client,
                $diagnose,
            ]),
            'method'=> 'GET',
            'url'=> route('note.write', [
                'client'=> $diagnose->client_id,
                'note'=> $diagnose->note_id,
                'section'=> NoteSection::DIAGNOSES,
            ]),
        ];
    }

    
    public function archive(Diagnose $diagnose)
    {
        return [
            'can'=> Gate::allows('archive', [
                Diagnose::class,
                $diagnose->client,
                $diagnose,
            ]),
            'method'=> 'PATCH',
            'url'=> route('diagnose.archive', [
                'client'=> $diagnose->client_id,
                'note'=> $diagnose->note_id,
                'diagnose'=> $diagnose->id,
            ]),
        ];
    }
}
