<?php

namespace App\Http\Resources\Structure;

use App\Models\Structure;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Http\Resources\Structure\Base\StructureDetail;
use App\Http\Resources\Structure\Base\StructureActionsResource;


class StructureDetailResource extends JsonResource
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
            'data'=> new StructureDetail($this->structure),
            'actions'=> new StructureActionsResource($this->structure),
        ];
    }
}
