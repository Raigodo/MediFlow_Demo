<?php

namespace App\Http\Resources\Measurement;

use App\Http\Resources\Measurement\Base\MeasurementsActionsResource;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Http\Resources\Json\ResourceCollection;

class MeasurementPreviewCollection extends ResourceCollection
{

    public function __construct(
        protected null|Collection|HasMany $measurements
    ) {
        parent::__construct($measurements ?? []);
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
            'actions'=> new MeasurementsActionsResource(),
        ];
    }
}
