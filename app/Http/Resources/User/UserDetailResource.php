<?php

namespace App\Http\Resources\User;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Resources\User\Base\UserDetail;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\User\Base\UserActionsResource;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Http\Resources\Structure\StructurePreviewCollection;

class UserDetailResource extends JsonResource
{

    public function __construct(
        protected User|BelongsTo $user
    ) {
        parent::__construct($user);
    }

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'data'=> new UserDetail($this->user),
            'actions'=> new UserActionsResource($this->user),
        ];
    }
}
