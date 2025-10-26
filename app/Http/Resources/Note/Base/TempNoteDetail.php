<?php

namespace App\Http\Resources\Note\Base;

use App\Models\Note;
use App\Enums\NoteSection;
use Illuminate\Http\Request;
use App\Services\CurrentContext;
use App\Services\SelectedContext;
use App\Services\DataAccess\Facades\Employees;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Client\ClientPreviewResource;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Http\Resources\Employee\EmployeePreviewResource;
use App\Http\Resources\Diagnose\DiagnosePreviewCollection;
use App\Http\Resources\Medication\MedicationPreviewCollection;
use App\Http\Resources\Measurement\MeasurementPreviewCollection;
use App\Http\Resources\AmbulanceCall\AmbulanceCallPreviewCollection;

class TempNoteDetail extends JsonResource
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
        $employee_id = CurrentContext::employeeId();
        $creator = $employee_id ? Employees::findDetail($employee_id) : abort(404);
        $client = SelectedContext::client();

        return [
            "id"=> null,
            'content'=> $note->content,
            'isImportant'=> $note->is_important,
            'createdAt'=> $note->created_at,
            'creator'=> new EmployeePreviewResource($creator),
            'client'=> new ClientPreviewResource($client),
            
            'ambulanceCalls'=> new AmbulanceCallPreviewCollection(collect()),
            'diagnoses'=> new DiagnosePreviewCollection(collect()),
            'measurements'=> new MeasurementPreviewCollection(collect()),
            'medications'=> new MedicationPreviewCollection(collect()),
            
            'sections'=> [
                'diagnoses'=> [
                    'can'=> true,
                    'url'=> route('note.write', [
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
                    'can'=> true,
                    'url'=> route('note.write', [
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
                    'can'=> true,
                    'url'=> route('note.write', [
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
                    'can'=> true,
                    'url'=> route('note.write', [
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

