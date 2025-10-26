<?php

namespace App\Http\Resources\AmbulanceCall;

use Illuminate\Http\Request;
use App\Models\AmbulanceCall;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Http\Resources\AmbulanceCall\Base\AmbulanceCallPreview;
use App\Http\Resources\AmbulanceCall\Base\AmbulanceCallActionsResource;

class AmbulanceCallPreviewResource extends JsonResource
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
        return [
            'data'=> new AmbulanceCallPreview($this->ambulance_call),
            'actions'=> new AmbulanceCallActionsResource($this->ambulance_call),
        ];
    }
}
