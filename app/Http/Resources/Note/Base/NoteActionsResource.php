<?php

namespace App\Http\Resources\Note\Base;

use App\Models\Note;
use App\Services\Actions\Facades\NoteActions;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class NoteActionsResource extends JsonResource
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
        $note = $this->note;

        return [
            'dropdown'=> [
                'destroy'=> NoteActions::destroy($note),
                'forceEdit'=> NoteActions::forceEdit($note),
            ],
            'show'=> NoteActions::show($note),
            'destroy'=> NoteActions::destroy($note),
            'forceEdit'=> NoteActions::forceEdit($note),
            'forceUpdate'=> NoteActions::forceUpdate($note),
        ];
    }
}
