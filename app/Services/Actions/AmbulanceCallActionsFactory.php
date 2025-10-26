<?php

namespace App\Services\Actions;

use App\Models\Client;
use App\Enums\ModalKey;
use App\Enums\NoteSection;
use App\Models\AmbulanceCall;
use Illuminate\Support\Facades\Gate;


class AmbulanceCallActionsFactory 
{
    public function index(Client $client)
    {
        return [
            'can'=> Gate::allows('list', [
                AmbulanceCall::class,
                $client,
            ]),
            'method'=> 'GET',
            'url'=> route('ambulance-call.index', [
                'client'=> $client->id,
            ]),
        ];
    }

    
    public function show(AmbulanceCall $ambulance_call)
    {
        return [
            'can'=> Gate::allows('view', [
                AmbulanceCall::class,
                $ambulance_call->client,
                $ambulance_call,
            ]),
            'method'=> 'GET',
            'url'=> route('note.show', [
                'client'=> $ambulance_call->client_id,
                'note'=> $ambulance_call->note_id,
                'ambulance_call'=> $ambulance_call->id,
                'section'=> NoteSection::AMBULANCE_CALLS,
            ]),
        ];
    }

    
    public function create(Client $client)
    {
        return [
            'can'=> Gate::allows('create', [
                AmbulanceCall::class,
                $client,
            ]),
            'method'=> 'GET',
            'url'=> route('note.write', [
                'client'=> $client->id,
                'section'=> NoteSection::AMBULANCE_CALLS,
                'modal'=> ModalKey::CREATE_AMBULANCE_CALL,
            ]),
        ];
    }

    
    public function edit(AmbulanceCall $ambulance_call)
    {
        return [
            'can'=> Gate::allows('update', [
                AmbulanceCall::class,
                $ambulance_call->client,
                $ambulance_call,
            ]),
            'method'=> 'GET',
            'url'=> route('note.write', [
                'client'=> $ambulance_call->client_id,
                'note'=> $ambulance_call->note_id,
                'section'=> NoteSection::AMBULANCE_CALLS,
            ]),
        ];
    }
}
