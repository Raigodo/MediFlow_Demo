<?php

namespace App\Http\Resources\Structure;

use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Http\Resources\Json\ResourceCollection;
use App\Http\Resources\Structure\Base\ManagersActionsResource;

class ManagerPreviewCollection extends ResourceCollection
{

    public function __construct(
        protected null|Collection|HasMany $managers
    ) {
        parent::__construct($managers ?? []);
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
            'actions'=> new ManagersActionsResource(),
        ];
    }
}
