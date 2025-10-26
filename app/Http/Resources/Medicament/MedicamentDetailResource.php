<?php

namespace App\Http\Resources\Medicament;

use App\Http\Resources\Medicament\Base\MedicamentActionsResource;
use App\Http\Resources\Medicament\Base\MedicamentDetail;
use App\Models\Medicament;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Http\Resources\Structure\StructurePreviewResource;

class MedicamentDetailResource extends JsonResource
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
            'data'=> new MedicamentDetail($this->medicament),
            'actions'=> new MedicamentActionsResource($this->medicament),
        ];
    }
}
