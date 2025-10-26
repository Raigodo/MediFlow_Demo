<?php

namespace App\Http\Resources\Measurement;

use App\Http\Resources\Measurement\Base\MeasurementActionsResource;
use App\Http\Resources\Measurement\Base\MeasurementDetail;
use App\Models\Measurement;
use Illuminate\Http\Request;
use App\Http\Resources\Note\NotePreviewResource;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Client\ClientPreviewResource;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Http\Resources\Employee\EmployeePreviewResource;

class MeasurementDetailResource extends JsonResource
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
            'data'=> new MeasurementDetail($this->measurement),
            'actions'=> new MeasurementActionsResource($this->measurement),
        ];
    }
}
