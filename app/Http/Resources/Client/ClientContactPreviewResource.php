<?php

namespace App\Http\Resources\Client;

use Illuminate\Http\Request;
use App\Models\ClientContact;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Http\Resources\Client\Base\ClientContactPreview;
use App\Http\Resources\Client\Base\ClientContactActionsResource;

class ClientContactPreviewResource extends JsonResource
{

    public function __construct(
        protected ClientContact|BelongsTo $contact
    ) {
        parent::__construct($contact);
    }


    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return new ClientContactPreview($this->contact)->toArray($request);
    }
}
