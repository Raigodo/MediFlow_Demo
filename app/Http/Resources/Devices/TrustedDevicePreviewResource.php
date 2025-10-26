<?php

namespace App\Http\Resources\Devices;

use Illuminate\Http\Request;
use App\Models\TrustedDevice;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Http\Resources\Devices\Base\TrustedDevicePreview;
use App\Http\Resources\Devices\Base\TrustedDeviceActionsResource;

class TrustedDevicePreviewResource extends JsonResource
{

    public function __construct(
        protected TrustedDevice|BelongsTo $device
    ) {
        parent::__construct($device);
    }

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'data'=> new TrustedDevicePreview($this->device),
            'actions'=> new TrustedDeviceActionsResource($this->device),
        ];
    }
}
