<?php

namespace App\Http\Resources\Devices\Base;

use App\Services\Actions\Facades\TrustedDeviceActions;
use Illuminate\Http\Request;
use App\Models\TrustedDevice;
use Illuminate\Support\Facades\Gate;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TrustedDeviceActionsResource extends JsonResource
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
        $device = $this->device;
        
        return [
            'dropdown'=> [
                'edit'=> TrustedDeviceActions::edit($device),
                'destroy'=> TrustedDeviceActions::destroy($device),
            ],
            'show'=> TrustedDeviceActions::show($device),
            'edit'=> TrustedDeviceActions::edit($device),
            'update'=> TrustedDeviceActions::update($device),
            'destroy'=> TrustedDeviceActions::destroy($device),
        ];
    }
}
