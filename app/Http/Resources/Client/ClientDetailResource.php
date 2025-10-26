<?php

namespace App\Http\Resources\Client;

use App\Http\Resources\Client\Base\ClientActionsResource;
use App\Http\Resources\Client\Base\ClientDetail;
use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ClientDetailResource extends JsonResource
{

    public function __construct(
        protected Client|BelongsTo $client
    ) {
        parent::__construct($client);
    }

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'data'=> new ClientDetail($this->client),
            'actions'=> new ClientActionsResource($this->client),
        ];
    }
}
