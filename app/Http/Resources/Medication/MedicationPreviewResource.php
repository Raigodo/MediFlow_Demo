<?php

namespace App\Http\Resources\Medication;

use App\Models\Medication;
use Illuminate\Http\Request;
use App\Http\Resources\Note\NotePreviewResource;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Client\ClientPreviewResource;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Http\Resources\Employee\EmployeePreviewResource;
use App\Http\Resources\Medication\Base\MedicationPreview;
use App\Http\Resources\Medicament\MedicamentPreviewResource;
use App\Http\Resources\Medication\Base\MedicationActionsResource;

class MedicationPreviewResource extends JsonResource
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
            'data'=> new MedicationPreview($this->medication),
            'actions'=> new MedicationActionsResource($this->medication),
        ];
    }
}
