<?php

namespace App\Http\Resources\Measurement\Base;

use Illuminate\Http\Request;
use App\Models\MeasurementType;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MeasurementTypeActionsResource extends JsonResource
{

    public function __construct(
        protected MeasurementType|BelongsTo $type
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
