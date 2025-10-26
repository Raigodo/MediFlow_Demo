<?php

namespace App\Http\Resources\Structure\Base;

use App\Models\Structure;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Http\Resources\Employee\EmployeePreviewResource;
use App\Http\Resources\Structure\ManagerPreviewCollection;


class StructureDetail extends JsonResource
{

    public function __construct(
        protected Structure|BelongsTo $structure
    ) {
        parent::__construct($structure);
    }

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $structure = $this->structure;
        $medicament_manager = $structure->medicament_manager;
     
        return [
            "id"=> $structure->id,
            'createdAt'=> $structure->created_at,
            'name'=> $structure->name,
            'iconUrl'=> $structure->icon_url,
            'managers'=> new ManagerPreviewCollection($structure->managers),
            'medicamentManager'=> $medicament_manager
                ? new EmployeePreviewResource($medicament_manager->employee)
                : null,
            'sections'=> new StructureDetailSections($structure),
        ];
    }
}
