<?php

namespace App\Http\Resources\Client;

use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Http\Resources\Json\ResourceCollection;
use App\Http\Resources\Client\Base\ClientsActionsResource;

class ClientPreviewCollection extends ResourceCollection
{

    public function __construct(
        protected null|Collection|HasMany $clients
    ) {
        parent::__construct($clients ?? []);
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
            'actions'=> new ClientsActionsResource(),
        ];
    }
}
