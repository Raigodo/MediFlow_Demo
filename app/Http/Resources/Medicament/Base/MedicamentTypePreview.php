<?php

namespace App\Http\Resources\Medicament\Base;

use Illuminate\Http\Request;
use App\Models\MedicamentType;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MedicamentTypePreview extends JsonResource
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
            "id"=> $this->medicament_type->id,
            "name"=> $this->medicament_type->name,
            "form"=> $this->medicament_type->form,
        ];
    }
}
