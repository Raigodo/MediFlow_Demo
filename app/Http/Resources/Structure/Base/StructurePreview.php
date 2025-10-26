<?php

namespace App\Http\Resources\Structure\Base;

use App\Models\Structure;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StructurePreview extends JsonResource
{

    public function __construct(
        protected Structure|BelongsTo $structure
    ) {
        parent::__construct($structure);
    }

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id"=> $this->structure->id,
            'createdAt'=> $this->structure->created_at,
            'name'=> $this->structure->name,
            'iconUrl'=> $this->structure->icon_url,
        ];
    }
}
