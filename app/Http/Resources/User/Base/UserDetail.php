<?php

namespace App\Http\Resources\User\Base;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Http\Resources\Structure\StructurePreviewCollection;

class UserDetail extends JsonResource
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
        $user = $this->user;

        return [
            "id"=> $user->id,
            'name'=> $user->name,
            'surname'=> $user->surname,
            'email'=> $user->email,
            'avatarUrl'=> $user->icon_url,
            'createdAt'=> $user->created_at,
            'verifiedAt'=> $user->email_verified_at,
            'role'=> $user->role->value,
            'structures'=> [
                'managed'=> new StructurePreviewCollection($user->managed_structures),
                'employed'=> new StructurePreviewCollection($user->employed_structures),
            ],
            
            'sections'=> [
                'baseData'=> [
                    'can'=> Gate::allows('view', [
                        User::class,
                        $user->id,
                    ]),
                    'url'=> route('user.show', [
                        'user'=> $user,
                    ])
                ],
                'structures'=> [
                    'can'=> Gate::allows('view', [
                        User::class,
                        $user->id,
                    ]),
                    'url'=> route('structure.list', [
                        'user'=> $user,
                    ])
                ],
            ],
        ];
    }
}
