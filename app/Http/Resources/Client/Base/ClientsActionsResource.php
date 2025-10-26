<?php

namespace App\Http\Resources\Client\Base;

use App\Services\Actions\Facades\ClientActions;
use Illuminate\Http\Request;
use App\Services\CurrentContext;
use App\Services\SelectedContext;
use Illuminate\Http\Resources\Json\JsonResource;

class ClientsActionsResource extends JsonResource
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
        $structure = SelectedContext::structure()
            ?? CurrentContext::structure();

        return [
            'dropdown'=> [
                'create'=> ClientActions::create($structure),
                'archived'=> ClientActions::archived($structure),
                'active'=> ClientActions::active($structure),
            ],
            'list'=> ClientActions::index($structure),
            'create'=> ClientActions::create($structure),
            'store'=> ClientActions::store(),
            'archived'=> ClientActions::archived($structure),
            'active'=> ClientActions::active($structure),
        ];
    }
}
