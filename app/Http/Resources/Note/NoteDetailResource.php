<?php

namespace App\Http\Resources\Note;

use App\Http\Resources\Note\Base\NoteActionsResource;
use App\Http\Resources\Note\Base\NoteDetail;
use App\Models\Note;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class NoteDetailResource extends JsonResource
{

    public function __construct(
        protected Note|BelongsTo $note
    ) {
        parent::__construct($note);
    }

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'data'=> new NoteDetail($this->note),
            'actions'=> new NoteActionsResource($this->note),
        ];
    }
}
