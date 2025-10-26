<?php

namespace App\Http\Resources\Measurement\Base;

use App\Enums\ModalKey;
use App\Enums\NoteSection;
use App\Models\Measurement;
use Illuminate\Http\Request;
use App\Services\CurrentContext;
use App\Services\SelectedContext;
use Illuminate\Support\Facades\Gate;
use App\Services\DataAccess\Facades\Notes;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Services\Actions\Facades\MeasurementActions;

class MeasurementsActionsResource extends JsonResource
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
                'create'=> MeasurementActions::create($client),
            ],
            'list'=> MeasurementActions::index($client),
            'create'=> MeasurementActions::create($client),
        ];
    }
}
