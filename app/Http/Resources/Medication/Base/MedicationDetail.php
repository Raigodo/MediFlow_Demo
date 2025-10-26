<?php

namespace App\Http\Resources\Medication\Base;

use App\Models\Medication;
use Illuminate\Http\Request;
use App\Http\Resources\Note\NotePreviewResource;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Client\ClientPreviewResource;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Http\Resources\Employee\EmployeePreviewResource;
use App\Http\Resources\Medicament\MedicamentTypePreviewResource;

class MedicationDetail extends JsonResource
{

    public function __construct(
        protected Medication|BelongsTo $medication
    ) {
        parent::__construct($medication);
    }

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id"=> $this->medication->id,
            "createdAt"=> $this->medication->created_at,
            'amount'=> $this->medication->amount,
            'medicamentType'=> new MedicamentTypePreviewResource($this->medication->medicament_type),
            'creator'=> new EmployeePreviewResource($this->medication->creator),
            'client'=> new ClientPreviewResource($this->medication->client),
            'note'=> new NotePreviewResource($this->medication->note),
        ];
    }
}
