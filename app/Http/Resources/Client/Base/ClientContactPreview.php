<?php

namespace App\Http\Resources\Client\Base;

use Illuminate\Http\Request;
use App\Models\ClientContact;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ClientContactPreview extends JsonResource
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
        return [
            "id"=> $this->contact->id,
            "title"=> $this->contact->title,
            "phoneNumber"=> $this->contact->phone_number,
            "clientId"=> $this->contact->client_id,
            'createdAt'=> $this->contact->created_at,
        ];
    }
}
