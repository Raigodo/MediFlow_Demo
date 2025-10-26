<?php

namespace App\Http\Resources\Diagnose;

use App\Models\Diagnose;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Diagnose\Base\DiagnosePreview;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Http\Resources\Diagnose\Base\DiagnoseActionsResource;

class DiagnosePreviewResource extends JsonResource
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
        return [
            'data'=> new DiagnosePreview($this->diagnose),
            'actions'=> new DiagnoseActionsResource($this->diagnose),
        ];
    }
}
