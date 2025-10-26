<?php

namespace App\Http\Resources\Note\Base;

use App\Models\Note;
use Illuminate\Http\Request;
use App\Services\SelectedContext;
use App\Services\Actions\Facades\NoteActions;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TempNoteActionsResource extends JsonResource
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
        $client = SelectedContext::client();

        return [
            'dropdown'=> [
                //
            ],
            'store'=> NoteActions::store($client), 
        ];
    }
}
