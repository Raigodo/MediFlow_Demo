<?php

namespace App\Http\Resources\Client;

use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Client\Base\ClientPreview;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Http\Resources\Client\Base\ClientActionsResource;

class ClientPreviewResource extends JsonResource
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
            'data'=> new ClientPreview($this->client),
            'actions'=> new ClientActionsResource($this->client),
        ];
    }
}
