<?php

namespace App\Http\Resources\Structure\Base;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ManagersActionsResource extends JsonResource
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
        return [
            'dropdown'=> [
                //
            ],
        ];
    }
}
