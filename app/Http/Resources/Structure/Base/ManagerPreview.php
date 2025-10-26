<?php

namespace App\Http\Resources\Structure\Base;

use App\Models\Manager;
use Illuminate\Http\Request;
use App\Http\Resources\User\UserPreviewResource;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Http\Resources\Structure\StructurePreviewResource;

class ManagerPreview extends JsonResource
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
            'user'=> new UserPreviewResource($this->manager->user),
            'structure'=> new StructurePreviewResource($this->manager->structure),
        ];
    }
}
