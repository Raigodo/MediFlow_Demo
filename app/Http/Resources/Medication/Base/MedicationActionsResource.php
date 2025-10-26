<?php

namespace App\Http\Resources\Medication\Base;

use App\Enums\NoteSection;
use App\Models\Medication;
use App\Services\Actions\Facades\MedicationActions;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MedicationActionsResource extends JsonResource
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
        $medication = $this->medication;

        return [
            'dropdown'=> [
                'edit'=> MedicationActions::edit($medication),
            ],
            'show'=> MedicationActions::show($medication),
            'edit'=> MedicationActions::edit($medication),
        ];
    }
}
