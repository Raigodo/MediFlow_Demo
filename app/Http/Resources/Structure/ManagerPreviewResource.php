<?php

namespace App\Http\Resources\Structure;

use App\Http\Resources\Structure\Base\ManagerActionsResource;
use App\Http\Resources\Structure\Base\ManagerPreview;
use App\Models\Manager;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ManagerPreviewResource extends JsonResource
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
            'data'=> new ManagerPreview($this->manager),
            'actions'=> new ManagerActionsResource($this->manager),
        ];
    }
}
