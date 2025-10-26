<?php

namespace App\Http\Resources\Medicament;

use App\Models\Medicament;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Http\Resources\Medicament\Base\MedicamentPreview;
use App\Http\Resources\Structure\StructurePreviewResource;
use App\Http\Resources\Medicament\Base\MedicamentActionsResource;

class MedicamentPreviewResource extends JsonResource
{

    public function __construct(
        protected Medicament|BelongsTo $medicament
    ) {
        parent::__construct($medicament);
    }


    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'data'=> new MedicamentPreview($this->medicament),
            'actions'=> new MedicamentActionsResource($this->medicament),
        ];
    }
}
