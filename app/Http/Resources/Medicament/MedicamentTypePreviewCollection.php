<?php

namespace App\Http\Resources\Medicament;

use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Http\Resources\Json\ResourceCollection;
use App\Http\Resources\Medicament\Base\MedicamentTypesActionsResource;

class MedicamentTypePreviewCollection extends ResourceCollection
{

    public function __construct(
        protected null|Collection|HasMany $medicament_types
    ) {
        parent::__construct($medicament_types ?? []);
    }


    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'data'=> $this->collection->toArray(),
            'actions'=> new MedicamentTypesActionsResource(),
        ];
    }
}
