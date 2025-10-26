<?php

namespace App\Http\Resources\Medicament\Base;

use Illuminate\Http\Request;
use App\Models\MedicamentType;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MedicamentTypeActionsResource extends JsonResource
{

    public function __construct(
        protected MedicamentType|BelongsTo $type
    ) {
        parent::__construct($type);
    }

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            //
        ];
    }
}
