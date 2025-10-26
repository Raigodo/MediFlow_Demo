<?php

namespace App\Http\Resources\Structure\Base;

use App\Models\Manager;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ManagerActionsResource extends JsonResource
{

    public function __construct(
        protected Manager|BelongsTo $manager
    ) {
        parent::__construct($manager);
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
