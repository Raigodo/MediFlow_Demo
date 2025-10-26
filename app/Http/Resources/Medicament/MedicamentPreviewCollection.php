<?php

namespace App\Http\Resources\Medicament;

use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Http\Resources\Json\ResourceCollection;
use App\Http\Resources\Medicament\Base\MedicamentsActionsResource;

class MedicamentPreviewCollection extends ResourceCollection
{

    public function __construct(
        protected null|Collection|HasMany $medicaments
    ) {
        parent::__construct($medicaments ?? []);
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
            'actions'=> new MedicamentsActionsResource(),
        ];
    }
}
