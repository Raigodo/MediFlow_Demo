<?php

namespace App\Http\Resources\Note;

use App\Models\Note;
use Illuminate\Http\Request;
use App\Http\Resources\Note\Base\NoteDetail;
use App\Http\Resources\Note\Base\TempNoteDetail;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Note\Base\NoteActionsResource;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Http\Resources\Note\Base\TempNoteActionsResource;

class TempNoteDetailResource extends JsonResource
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
            'data'=> new TempNoteDetail($this->note),
            'actions'=> new TempNoteActionsResource($this->note),
        ];
    }
}
