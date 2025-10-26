<?php

namespace App\Http\Resources\Note;

use App\Models\Note;
use Illuminate\Http\Request;
use App\Http\Resources\Note\Base\NotePreview;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Note\Base\NoteActionsResource;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class NotePreviewResource extends JsonResource
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
            'data'=> new NotePreview($this->note),
            'actions'=> new NoteActionsResource($this->note),
        ];
    }
}
