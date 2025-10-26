<?php

namespace App\Http\Resources\Structure;

use App\Http\Resources\Structure\Base\StructuresActionsResource;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Http\Resources\Json\ResourceCollection;

class StructurePreviewCollection extends ResourceCollection
{

    public function __construct(
        protected null|Collection|HasMany $structures
    ) {
        parent::__construct($structures ?? []);
    }

    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'data'=> $this->collection->toArray(),
            'actions'=> new StructuresActionsResource(),
        ];
    }
}
