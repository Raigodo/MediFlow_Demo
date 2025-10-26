<?php

namespace App\Http\Resources\Note;

use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Http\Resources\Note\Base\NotesActionsResource;
use Illuminate\Http\Resources\Json\ResourceCollection;

class NotePreviewCollection extends ResourceCollection
{

    public function __construct(
        protected null|Collection|HasMany $notes
    ) {
        parent::__construct($notes ?? []);
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
            'actions'=> new NotesActionsResource(),
        ];
    }
}
