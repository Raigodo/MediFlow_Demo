<?php

namespace App\Http\Resources\Medicament;

use Illuminate\Http\Request;
use App\Models\MedicamentType;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Http\Resources\Medicament\Base\MedicamentTypePreview;
use App\Http\Resources\Medicament\Base\MedicamentTypeActionsResource;

class MedicamentTypePreviewResource extends JsonResource
{

    public function __construct(
        protected MedicamentType|BelongsTo $medicament_type
    ) {
        parent::__construct($medicament_type);
    }


    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'data'=> new MedicamentTypePreview($this->medicament_type),
            'actions'=> new MedicamentTypeActionsResource($this->medicament_type),
        ];
    }
}
