<?php

namespace App\Http\Resources\AmbulanceCall;

use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Http\Resources\Json\ResourceCollection;
use App\Http\Resources\AmbulanceCall\Base\AmbulanceCallsActionsResource;

class AmbulanceCallPreviewCollection extends ResourceCollection
{

    public function __construct(
        protected null|Collection|HasMany $ambulance_calls
    ) {
        parent::__construct($ambulance_calls ?? []);
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
            'actions'=> new AmbulanceCallsActionsResource(),
        ];
    }
}
