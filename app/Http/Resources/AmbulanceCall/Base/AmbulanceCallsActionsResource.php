<?php

namespace App\Http\Resources\AmbulanceCall\Base;

use App\Services\Actions\Facades\AmbulanceCallActions;
use Illuminate\Http\Request;
use App\Services\SelectedContext;
use Illuminate\Http\Resources\Json\JsonResource;

class AmbulanceCallsActionsResource extends JsonResource
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
        $client = SelectedContext::client();
        
        return [
            'dropdown'=> [
                'create'=> AmbulanceCallActions::create($client),
            ],
            'create'=> AmbulanceCallActions::create($client),
        ];
    }
}
