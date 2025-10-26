<?php

namespace App\Http\Resources\Measurement;

use Illuminate\Http\Request;
use App\Models\MeasurementType;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Http\Resources\Measurement\Base\MeasurementTypePreview;
use App\Http\Resources\Measurement\Base\MeasurementTypeActionsResource;

class MeasurementTypePreviewResource extends JsonResource
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
            'data'=> new MeasurementTypePreview($this->measurement_type),
            'actions'=> new MeasurementTypeActionsResource($this->measurement_type),
        ];
    }
}
