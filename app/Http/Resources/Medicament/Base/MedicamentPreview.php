<?php

namespace App\Http\Resources\Medicament\Base;

use App\Models\Medicament;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Http\Resources\Structure\StructurePreviewResource;
use App\Http\Resources\Medicament\MedicamentTypePreviewResource;

class MedicamentPreview extends JsonResource
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
            "id"=> $this->medicament->id,
            'amount'=> $this->medicament->amount,
            'medicamentType'=> new MedicamentTypePreviewResource($this->medicament->medicament_type),
            'structure'=> new StructurePreviewResource($this->medicament->structure),
        ];
    }
}
