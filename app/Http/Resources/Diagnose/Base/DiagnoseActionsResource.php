<?php

namespace App\Http\Resources\Diagnose\Base;

use App\Models\Diagnose;
use Illuminate\Http\Request;
use App\Services\Actions\Facades\NoteActions;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Services\Actions\Facades\DiagnoseActions;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DiagnoseActionsResource extends JsonResource
{

    public function __construct(
        protected Diagnose|BelongsTo $diagnose
    ) {
        parent::__construct($diagnose);
    }

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $diagnose = $this->diagnose;
        
        return [
            'dropdown'=> [
                'edit'=> DiagnoseActions::edit($diagnose),
                'archive'=> DiagnoseActions::archive($diagnose),
            ],
            'show'=> DiagnoseActions::show($diagnose),
            'edit'=> DiagnoseActions::edit($diagnose),
            'archive'=> DiagnoseActions::archive($diagnose),
        ];
    }
}
