<?php

namespace App\Http\Resources\Client\Base;

use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Http\Resources\Structure\StructurePreviewResource;

class ClientPreview extends JsonResource
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
            "id"=> $this->client->id,
            'name'=>$this->client->name,
            'surname'=>$this->client->surname,
            'avatarUrl'=>$this->client->icon_url,
            'createdAt'=> $this->client->created_at,
            'joinedOn'=>$this->client->joined_on,
            'archiveOn'=> $this->client->archived_on,
            'structure'=>new StructurePreviewResource($this->client->structure),
        ];
    }
}
