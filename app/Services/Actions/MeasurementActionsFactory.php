<?php

namespace App\Services\Actions;

use App\Models\Note;
use App\Models\Client;
use App\Enums\ModalKey;
use App\Enums\NoteSection;
use App\Models\Measurement;
use Illuminate\Support\Facades\Gate;


class MeasurementActionsFactory
{
    public function index(Client $client)
    {
        return [
            'can'=> Gate::allows('list', [
                Measurement::class,
                $client,
            ]),
            'method'=> 'GET',
            'url'=> route('measurement.index', [
                'client'=> $client->id,
            ]),
        ];
    }

    
    public function show(Measurement $measurement)
    {
        return [
            'can'=> Gate::allows('view', [
                Measurement::class,
                $measurement->client,
                $measurement,
            ]),
            'method'=> 'GET',
            'url'=> route('note.show', [
                'client'=> $measurement->client_id,
                'note'=> $measurement->note_id,
                'measurement'=> $measurement->id,
            ]),
        ];
    }

    
    public function create(Client $client)
    {
        return [
            'can'=> Gate::allows('create', [
                Measurement::class,
                $client,
            ]),
            'method'=> 'GET',
            'url'=> route('note.write', [
                'client'=> $client->id,
                'section'=> NoteSection::MEASUREMENTS,
                'modal'=> ModalKey::CREATE_MEASUREMENT,
            ]),
        ];
    }

    
    public function edit(Measurement $measurement)
    {
        return [
            'can'=> Gate::allows('update', [
                Measurement::class,
                $measurement->client,
                $measurement,
            ]),
            'method'=> 'GET',
            'url'=> route('note.write', [
                'client'=> $measurement->client_id,
                'note'=> $measurement->note_id,
                'section'=> NoteSection::MEASUREMENTS,
            ]),
        ];
    }
}
