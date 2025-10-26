<?php

namespace App\Http\Resources\Medication;

use App\Models\Medication;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Http\Resources\Medication\Base\MedicationActionsResource;

class MedicationDetailResource extends JsonResource
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
            'data'=> new MedicationDetailResource($this->medication),
            'actions'=> new MedicationActionsResource($this->medication),
        ];
    }
}
