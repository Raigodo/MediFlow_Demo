<?php

namespace App\Http\Resources\Devices\Base;

use App\Services\Actions\Facades\TrustedDeviceActions;
use Illuminate\Http\Request;
use App\Models\TrustedDevice;
use App\Services\CurrentContext;
use App\Services\SelectedContext;
use Illuminate\Support\Facades\Gate;
use Illuminate\Http\Resources\Json\JsonResource;

class TrustedDevicesActionsResource extends JsonResource
{

    public function __construct() {
        parent::__construct([]);
    }

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $structure = SelectedContext::structure()
            ?? CurrentContext::structure();
            
        return [
            'dropdown'=> [
                'trust'=> TrustedDeviceActions::trust($structure),
                'untrust'=> TrustedDeviceActions::untrust($structure),
            ],
            'list'=> TrustedDeviceActions::index($structure),
            'trust'=> TrustedDeviceActions::trust($structure),
            'untrust'=> TrustedDeviceActions::untrust($structure),
        ];
    }
}
