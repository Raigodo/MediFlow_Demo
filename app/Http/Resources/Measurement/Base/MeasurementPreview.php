<?php

namespace App\Http\Resources\Measurement\Base;

use App\Models\Measurement;
use Illuminate\Http\Request;
use App\Http\Resources\Note\NotePreviewResource;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Client\ClientPreviewResource;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Http\Resources\Employee\EmployeePreviewResource;
use App\Http\Resources\Measurement\MeasurementTypePreviewResource;

class MeasurementPreview extends JsonResource
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
            "id"=> $this->measurement->id,
            "createdAt"=> $this->measurement->created_at,
            'value'=> $this->measurement->value,
            'measurementType'=> new MeasurementTypePreviewResource($this->measurement->measurement_type),
            'creator'=> new EmployeePreviewResource($this->measurement->creator),
            'client'=> new ClientPreviewResource($this->measurement->client),
            'note'=> new NotePreviewResource($this->measurement->note),
        ];
    }
}
