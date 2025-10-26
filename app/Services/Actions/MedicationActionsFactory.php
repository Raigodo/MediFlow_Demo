<?php

namespace App\Services\Actions;

use App\Models\Note;
use App\Models\Client;
use App\Enums\ModalKey;
use App\Enums\NoteSection;
use App\Models\Medication;
use Illuminate\Support\Facades\Gate;


class MedicationActionsFactory
{
    public function index(Client $client)
    {
        return [
            'can'=> Gate::allows('list', [
                Medication::class,
                $client,
            ]),
            'method'=> 'GET',
            'url'=> route('medication.index', [
                'client'=> $client->id,
            ]),
        ];
    }

    
    public function show(Medication $medication)
    {
        return [
            'can'=> Gate::allows('view', [
                Medication::class,
                $medication->client,
                $medication,
            ]),
            'method'=> 'GET',
            'url'=> route('note.show', [
                'client'=> $medication->client_id,
                'note'=> $medication->note_id,
                'medication'=> $medication->id,
            ]),
        ];
    }

    
    public function create(Client $client)
    {
        return [
            'can'=> Gate::allows('create', [
                Medication::class,
                $client,
            ]),
            'method'=> 'GET',
            'url'=> route('note.write', [
                'client'=> $client->id,
                'section'=> NoteSection::MEDICATIONS,
                'modal'=> ModalKey::CREATE_MEDICATION,
            ]),
        ];
    }

    
    public function edit(Medication $medication)
    {
        return [
            'can'=> Gate::allows('update', [
                Medication::class,
                $medication->client,
                $medication,
            ]),
            'method'=> 'GET',
            'url'=> route('note.write', [
                'client'=> $medication->client_id,
                'note'=> $medication->note_id,
                'section'=> NoteSection::MEDICATIONS,
            ]),
        ];
    }
}