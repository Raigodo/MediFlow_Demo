<?php

namespace App\Http\Resources\Client\Base;

use App\Models\Client;
use App\Services\Actions\Facades\AmbulanceCallActions;
use App\Services\Actions\Facades\ClientActions;
use App\Services\Actions\Facades\DiagnoseActions;
use App\Services\Actions\Facades\MeasurementActions;
use App\Services\Actions\Facades\NoteActions;
use App\Services\Actions\Facades\MedicationActions;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ClientActionsResource extends JsonResource
{

    public function __construct(
        protected Client|BelongsTo $client
    ) {
        parent::__construct($client);
    }

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $client = $this->client;

        return [
            'dropdown'=> [
                'edit'=> ClientActions::edit($client),
                'archive'=> ClientActions::archive($client),
                'unarchive'=> ClientActions::unarchive($client),
            ],
            'show'=> ClientActions::show($client),
            'edit'=> ClientActions::edit($client),
            'update'=> ClientActions::update($client),
            'archive'=> ClientActions::archive($client),
            'unarchive'=> ClientActions::unarchive($client),
            'setIcon'=> ClientActions::updateIcon($client),

            'ambulanceCalls'=> AmbulanceCallActions::index($client),
            'diagnoses'=> DiagnoseActions::index($client),
            'measurements'=> MeasurementActions::index($client),
            'medications'=> MedicationActions::index($client),
            
            'notes'=> NoteActions::index($client),
            'writeNote'=> NoteActions::write($client),
            'storeNote'=> NoteActions::store($client),
        ];
    }
}
