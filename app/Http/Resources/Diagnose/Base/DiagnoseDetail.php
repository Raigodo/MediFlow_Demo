<?php

namespace App\Http\Resources\Diagnose\Base;

use App\Models\Diagnose;
use Illuminate\Http\Request;
use App\Http\Resources\Note\NotePreviewResource;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Client\ClientPreviewResource;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Http\Resources\Employee\EmployeePreviewResource;

class DiagnoseDetail extends JsonResource
{

    public function __construct(
        protected Diagnose|BelongsTo $diagnose
    ) {
        parent::__construct($diagnose);
    }

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id"=> $this->diagnose->id,
            "createdAt"=> $this->diagnose->created_at,
            'name'=> $this->diagnose->name,
            'archivedOn'=> $this->diagnose->archived_on,
            'creator'=> new EmployeePreviewResource($this->diagnose->creator),
            'client'=> new ClientPreviewResource($this->diagnose->client),
            'note'=> new NotePreviewResource($this->diagnose->note),
        ];
    }
}
