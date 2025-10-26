<?php

namespace App\Http\Resources\Structure\Base;

use App\Enums\ModalKey;
use App\Models\Structure;
use App\Enums\NoteSection;
use App\Services\Actions\Facades\StructureActions;
use Illuminate\Http\Request;
use App\Services\CurrentContext;
use App\Services\SelectedContext;
use Illuminate\Support\Facades\Gate;
use Illuminate\Http\Resources\Json\JsonResource;

class StructuresActionsResource extends JsonResource
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
        $user = CurrentContext::user();

        return [
            'dropdown'=> [
                'create'=> StructureActions::create($user),
            ],
            'list'=> StructureActions::list($user),
            'create'=> StructureActions::create($user),
            'store'=> StructureActions::store(),
        ];
    }
}
