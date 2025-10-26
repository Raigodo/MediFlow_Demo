<?php

namespace App\Http\Resources\AmbulanceCall\Base;

use Illuminate\Http\Request;
use App\Models\AmbulanceCall;
use App\Http\Resources\Note\NotePreviewResource;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Client\ClientPreviewResource;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Http\Resources\Employee\EmployeePreviewResource;

class AmbulanceCallPreview extends JsonResource
{

    public function __construct(
        protected AmbulanceCall|BelongsTo $ambulance_call
    ) {
        parent::__construct($ambulance_call);
    }

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $resource = $this->ambulance_call;

        return [
            "id"=> $resource->id,
            "createdAt"=> $resource->created_at,
            'result'=> $resource->result,
            'creator'=> new EmployeePreviewResource($resource->creator),
            'client'=> new ClientPreviewResource($resource->client),
            'note'=> new NotePreviewResource($resource->note),
        ];
    }
}
