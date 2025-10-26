<?php

namespace App\Http\Resources\Devices\Base;

use Illuminate\Http\Request;
use App\Models\TrustedDevice;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Http\Resources\Employee\EmployeePreviewResource;
use App\Http\Resources\Structure\StructurePreviewResource;

class TrustedDevicePreview extends JsonResource
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
            'id'=> $this->device->id,
            'createdAt'=> $this->device->created_at,
            'note'=> $this->device->note,
            'lastUsedAt'=> $this->device->last_used_at,
            'lastEmployee'=> $this->device->last_employee
                ? new EmployeePreviewResource($this->device->last_employee)
                : null,
            'structure'=> new StructurePreviewResource($this->device->structure),
        ];
    }
}
