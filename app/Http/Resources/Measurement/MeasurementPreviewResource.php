<?php

namespace App\Http\Resources\Measurement;

use App\Models\Measurement;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Http\Resources\Measurement\Base\MeasurementPreview;
use App\Http\Resources\Measurement\Base\MeasurementActionsResource;

class MeasurementPreviewResource extends JsonResource
{

    public function __construct(
        protected Measurement|BelongsTo $measurement
    ) {
        parent::__construct($measurement);
    }

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'data'=> new MeasurementPreview($this->measurement),
            'actions'=> new MeasurementActionsResource($this->measurement),
        ];
    }
}
