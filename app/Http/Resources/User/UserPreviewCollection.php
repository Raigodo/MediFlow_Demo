<?php

namespace App\Http\Resources\User;

use App\Http\Resources\User\Base\UsersActionsResource;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Http\Resources\Json\ResourceCollection;

class UserPreviewCollection extends ResourceCollection
{

    public function __construct(
        protected null|Collection|HasMany $users
    ) {
        parent::__construct($users ?? []);
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
            'actions'=> new UsersActionsResource(),
        ];
    }
}
