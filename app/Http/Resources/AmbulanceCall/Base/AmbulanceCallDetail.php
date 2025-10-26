<?php

namespace App\Http\Resources\AmbulanceCall\Base;

use Illuminate\Http\Request;
use App\Models\AmbulanceCall;
use App\Http\Resources\Note\NotePreviewResource;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Client\ClientPreviewResource;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Http\Resources\Employee\EmployeePreviewResource;

class AmbulanceCallDetail extends JsonResource
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
            "id"=> $this->ambulance_call->id,
            "createdAt"=> $this->ambulance_call->created_at,
            'result'=> $this->ambulance_call->result,
            'creator'=> new EmployeePreviewResource($this->ambulance_call->creator),
            'client'=> new ClientPreviewResource($this->ambulance_call->client),
            'note'=> new NotePreviewResource($this->ambulance_call->note),
        ];
    }
}
