<?php

namespace App\Http\Resources\Diagnose;

use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Http\Resources\Json\ResourceCollection;
use App\Http\Resources\Diagnose\Base\DiagnosesActionsResource;

class DiagnosePreviewCollection extends ResourceCollection
{

    public function __construct(
        protected null|Collection|HasMany $diagnoses
    ) {
        parent::__construct($diagnoses ?? []);
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
            'actions'=> new DiagnosesActionsResource(),
        ];
    }
}
