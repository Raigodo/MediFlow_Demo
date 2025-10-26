<?php

namespace App\Http\Resources\Medicament\Base;

use App\Models\Medicament;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Services\Actions\Facades\MedicamentActions;

class MedicamentActionsResource extends JsonResource
{

    public function __construct(
        protected Medicament|BelongsTo $medicament
    ) {
        parent::__construct($medicament);
    }

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $medicament = $this->medicament;

        return [
            'dropdown'=> [
                //
            ],
            'show'=> MedicamentActions::show($medicament),
        ];
    }
}
