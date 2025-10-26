<?php

namespace App\Http\Resources\Note\Base;

use App\Models\Note;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Client\ClientPreviewResource;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Http\Resources\Employee\EmployeePreviewResource;

class NotePreview extends JsonResource
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
            "id"=> $this->note->id,
            'content'=> $this->note->content,
            'isImportant'=> $this->note->is_important,
            'createdAt'=> $this->note->created_at,
            'creator'=> new EmployeePreviewResource($this->note->creator),
            'client'=> new ClientPreviewResource($this->note->client),
        ];
    }
}
