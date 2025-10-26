<?php

namespace App\Http\Resources\User;

use App\Http\Resources\User\Base\UserActionsResource;
use App\Http\Resources\User\Base\UserPreview;
use App\Models\User;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserPreviewResource extends JsonResource
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
            'data'=> new UserPreview($this->user),
            'actions'=> new UserActionsResource($this->user),
        ];
    }
}
