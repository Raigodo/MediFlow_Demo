<?php

namespace App\Http\Resources\User\Base;

use App\Models\User;
use App\Enums\ModalKey;
use App\Services\Actions\Facades\UserActions;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Http\Resources\Json\JsonResource;

class UsersActionsResource extends JsonResource
{

    public function __construct() {
        parent::__construct([]);
    }

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {

        return [
            'dropdown'=> [
                'create'=> UserActions::create(),
            ],
            'list'=> UserActions::index(),
            'create'=> UserActions::create(),
        ];
    }
}
