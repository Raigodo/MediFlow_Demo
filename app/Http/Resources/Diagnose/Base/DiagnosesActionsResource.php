<?php

namespace App\Http\Resources\Diagnose\Base;

use App\Models\Client;
use App\Enums\ModalKey;
use App\Models\Diagnose;
use App\Enums\NoteSection;
use Illuminate\Http\Request;
use App\Services\CurrentContext;
use App\Services\SelectedContext;
use Illuminate\Support\Facades\Gate;
use App\Services\DataAccess\Facades\Notes;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Services\Actions\Facades\DiagnoseActions;

class DiagnosesActionsResource extends JsonResource
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
                'create'=> DiagnoseActions::create($client),
            ],
            'list'=> DiagnoseActions::index($client),
            'create'=> DiagnoseActions::create($client)
        ];
    }
}
