<?php

namespace App\Http\Resources\Client\Base;

use App\Models\Client;
use App\Services\Actions\Facades\ClientActions;
use App\Services\Actions\Facades\MedicationActions;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Services\Actions\Facades\DiagnoseActions;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Services\Actions\Facades\AmbulanceCallActions;
use App\Services\Actions\Facades\MeasurementActions;
use App\Http\Resources\Structure\StructurePreviewResource;
use App\Http\Resources\Client\ClientContactPreviewCollection;

class ClientDetail extends JsonResource
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
            "id"=> $client->id,
            'name'=>$client->name,
            'surname'=>$client->surname,
            'birthDate'=>$client->birth_date,
            'avatarUrl'=>$client->icon_url,
            'personalCode'=>$client->personal_code,
            'language'=>$client->language,
            'religion'=>$client->religion,
            'weight'=>$client->weight,
            'height'=>$client->height,
            'archiveOn'=> $client->archived_on,
            'invalidity'=>[
                'group'=>$client->invalidity_group,
                'type'=>$client->invalidity_type,
                'expiresOn'=>$client->invalidity_expires_on,
            ],
            'createdAt'=> $client->created_at,
            'joinedOn'=>$client->joined_on,
            'contacts'=> new ClientContactPreviewCollection($client->contacts),
            'structure'=> new StructurePreviewResource($client->structure),

            'sections'=> [
                'baseData'=> ClientActions::showData($client),
                'diagnoses'=> DiagnoseActions::index($client),
                'measurements'=> MeasurementActions::index($client),
                'medications'=> MedicationActions::index($client),
                'ambulanceCalls'=> AmbulanceCallActions::index($client),
            ],
        ];
    }
}
