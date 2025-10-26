<?php

namespace App\Http\Resources\Medicament\Base;

use App\Services\Actions\Facades\MedicamentActions;
use Illuminate\Http\Request;
use App\Services\CurrentContext;
use App\Services\SelectedContext;
use Illuminate\Http\Resources\Json\JsonResource;

class MedicamentsActionsResource extends JsonResource
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
                'supply'=> MedicamentActions::supply(),
            ],
            'list'=> MedicamentActions::index(),
            'supply'=> MedicamentActions::supply(),
            'batchStore'=> MedicamentActions::batchStore(),
        ];
    }
}