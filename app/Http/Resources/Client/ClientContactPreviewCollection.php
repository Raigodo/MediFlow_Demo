<?php

namespace App\Http\Resources\Client;

use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Support\Collection;

class ClientContactPreviewCollection extends ResourceCollection
{

    public function __construct(
        protected null|Collection|HasMany $contacts
    ) {
        parent::__construct($contacts ?? []);
    }


    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return $this->collection->toArray();
    }
}
