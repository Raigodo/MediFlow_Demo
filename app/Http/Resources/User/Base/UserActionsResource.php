<?php

namespace App\Http\Resources\User\Base;

use App\Models\User;
use App\Services\Actions\Facades\StructureActions;
use App\Services\Actions\Facades\UserActions;
use App\Services\Actions\Facades\SessionActions;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserActionsResource extends JsonResource
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
            'dropdown'=> [
                'edit'=> UserActions::edit($user),
                'alter'=> SessionActions::alter($user),
                'alterReset'=> SessionActions::alterReset(),
            ],
            'list'=> UserActions::index(),
            'show'=> UserActions::show($user),
            'create'=> UserActions::create(),
            'store'=> UserActions::store(),
            'edit'=> UserActions::edit($user),
            'update'=> UserActions::update($user),
            'destroy'=> UserActions::destroy($user),
            'setIcon'=> UserActions::updateIcon($user),

            'alter'=> SessionActions::alter($user),
            'alterReset'=> SessionActions::alterReset(),

            'structures'=> StructureActions::list($user),

            'storeStructure'=> StructureActions::store(),
        ];
    }
}
