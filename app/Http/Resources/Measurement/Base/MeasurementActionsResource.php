<?php

namespace App\Http\Resources\Measurement\Base;

use App\Models\Measurement;
use App\Services\Actions\Facades\MeasurementActions;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MeasurementActionsResource extends JsonResource
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
        $measurement = $this->measurement;

        return [
            'dropdown'=> [
                'edit'=> MeasurementActions::edit($measurement),
            ],
            'show'=> MeasurementActions::show($measurement),
            'edit'=> MeasurementActions::edit($measurement),
        ];
    }
}
