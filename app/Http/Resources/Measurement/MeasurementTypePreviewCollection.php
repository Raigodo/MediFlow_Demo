<?php

namespace App\Http\Resources\Measurement;

use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Http\Resources\Json\ResourceCollection;
use App\Http\Resources\Measurement\Base\MeasurementTypesActionsResource;

class MeasurementTypePreviewCollection extends ResourceCollection
{

    public function __construct(
        protected null|Collection|HasMany $measurement_types
    ) {
        parent::__construct($measurement_types ?? []);
    }


    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'data'=> $this->collection->toArray(),
            'actions'=> new MeasurementTypesActionsResource(),
        ];
    }
}
