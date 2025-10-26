<?php

namespace App\Http\Resources\Measurement\Base;

use Illuminate\Http\Request;
use App\Models\MeasurementType;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MeasurementTypePreview extends JsonResource
{

    public function __construct(
        protected MeasurementType|BelongsTo $measurement_type
    ) {
        parent::__construct($measurement_type);
    }


    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id"=> $this->measurement_type->id,
            "name"=> $this->measurement_type->name,
            "units"=> $this->measurement_type->units,
        ];
    }
}
