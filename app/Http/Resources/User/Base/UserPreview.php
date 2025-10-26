<?php

namespace App\Http\Resources\User\Base;

use App\Models\User;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserPreview extends JsonResource
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
            "id"=> $this->user->id,
            'name'=> $this->user->name,
            'surname'=> $this->user->surname,
            'avatarUrl'=> $this->user->icon_url,
            'role'=> $this->user->role,
            'createdAt'=> $this->user->created_at,
        ];
    }
}
