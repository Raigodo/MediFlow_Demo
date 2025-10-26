<?php

namespace App\Http\Resources\AmbulanceCall\Base;

use App\Models\Note;
use App\Enums\NoteSection;
use App\Services\Actions\Facades\AmbulanceCallActions;
use App\Services\Actions\Facades\NoteActions;
use Illuminate\Http\Request;
use App\Models\AmbulanceCall;
use Illuminate\Support\Facades\Gate;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AmbulanceCallActionsResource extends JsonResource
{

    public function __construct(
        protected AmbulanceCall|BelongsTo $ambulance_call
    ) {
        parent::__construct($ambulance_call);
    }

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $ambulance_call = $this->ambulance_call;

        return [
            'dropdown'=> [
                'edit'=> AmbulanceCallActions::edit($ambulance_call),
            ],
            'show'=> AmbulanceCallActions::show($ambulance_call),
            'edit'=> AmbulanceCallActions::edit($ambulance_call),
        ];
    }
}
