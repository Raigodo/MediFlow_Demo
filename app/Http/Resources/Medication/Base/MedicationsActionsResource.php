<?php

namespace App\Http\Resources\Medication\Base;

use App\Enums\NoteSection;
use App\Models\Medication;
use Illuminate\Http\Request;
use App\Services\CurrentContext;
use App\Services\SelectedContext;
use Illuminate\Support\Facades\Gate;
use App\Services\DataAccess\Facades\Notes;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Services\Actions\Facades\MedicationActions;

class MedicationsActionsResource extends JsonResource
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
                'create'=> MedicationActions::create($client)
            ],
            'list'=> MedicationActions::index($client),
            'create'=> MedicationActions::create($client)
        ];
    }
}
