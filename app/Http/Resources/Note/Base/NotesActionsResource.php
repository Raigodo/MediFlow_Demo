<?php

namespace App\Http\Resources\Note\Base;

use App\Services\Actions\Facades\NoteActions;
use Illuminate\Http\Request;
use App\Services\SelectedContext;
use Illuminate\Http\Resources\Json\JsonResource;

class NotesActionsResource extends JsonResource
{

    public function __construct() {
        parent::__construct([]);
    }

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $client = SelectedContext::client();

        return [
            'dropdown'=> [
                'write'=> NoteActions::write($client),
            ],
            'list'=> NoteActions::index($client),
            'write'=> NoteActions::write($client),
            'store'=> NoteActions::store($client), 
        ];
    }
}
