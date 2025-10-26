<?php

namespace App\Http\Resources\Note\Base;

use App\Enums\NoteSection;
use App\Models\Note;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Client\ClientPreviewResource;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Http\Resources\Employee\EmployeePreviewResource;
use App\Http\Resources\Diagnose\DiagnosePreviewCollection;
use App\Http\Resources\Medication\MedicationPreviewCollection;
use App\Http\Resources\Measurement\MeasurementPreviewCollection;
use App\Http\Resources\AmbulanceCall\AmbulanceCallPreviewCollection;

class NoteDetail extends JsonResource
{

    public function __construct(
        protected Note|BelongsTo $note
    ) {
        parent::__construct($note);
    }

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $note = $this->note;

        return [
            "id"=> $note->id,
            'content'=> $note->content,
            'isImportant'=> $note->is_important,
            'createdAt'=> $note->created_at,
            'creator'=> new EmployeePreviewResource($note->creator),
            'client'=> new ClientPreviewResource($note->client),
            
            'ambulanceCalls'=> new AmbulanceCallPreviewCollection($note->ambulance_calls),
            'diagnoses'=> new DiagnosePreviewCollection($note->diagnoses),
            'measurements'=> new MeasurementPreviewCollection($note->measurements),
            'medications'=> new MedicationPreviewCollection($note->medications),
            
            'sections'=> [
                'diagnoses'=> [
                    'can'=> Gate::allows('view', [
                        Note::class,
                        $note->client_id,
                        $note->id,
                    ]),
                    'url'=> route('note.show', [
                        'client'=> $note->client_id,
                        'note'=> $note->id,
                        'section'=> NoteSection::DIAGNOSES,
                    ]),
                    'metadata'=> [
                        'preventRefresh'=> true,
                        'sectionKey'=> NoteSection::DIAGNOSES,
                    ]
                ],
                'measurements'=> [
                    'can'=> Gate::allows('view', [
                        Note::class,
                        $note->client_id,
                        $note->id,
                    ]),
                    'url'=> route('note.show', [
                        'client'=> $note->client_id,
                        'note'=> $note->id,
                        'section'=> NoteSection::MEASUREMENTS,
                    ]),
                    'metadata'=> [
                        'preventRefresh'=> true,
                        'sectionKey'=> NoteSection::MEASUREMENTS,
                    ]
                ],
                'medications'=> [
                    'can'=> Gate::allows('view', [
                        Note::class,
                        $note->client_id,
                        $note->id,
                    ]),
                    'url'=> route('note.show', [
                        'client'=> $note->client_id,
                        'note'=> $note->id,
                        'section'=> NoteSection::MEDICATIONS,
                    ]),
                    'metadata'=> [
                        'preventRefresh'=> true,
                        'sectionKey'=> NoteSection::MEDICATIONS,
                    ]
                ],
                'ambulanceCalls'=> [
                    'can'=> Gate::allows('view', [
                        Note::class,
                        $note->client_id,
                        $note->id,
                    ]),
                    'url'=> route('note.show', [
                        'client'=> $note->client_id,
                        'note'=> $note->id,
                        'section'=> NoteSection::AMBULANCE_CALLS,
                    ]),
                    'metadata'=> [
                        'preventRefresh'=> true,
                        'sectionKey'=> NoteSection::AMBULANCE_CALLS,
                    ]
                ],
            ],
        ];
    }
}

