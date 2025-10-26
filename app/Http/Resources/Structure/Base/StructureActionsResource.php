<?php

namespace App\Http\Resources\Structure\Base;

use App\Models\Structure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use App\Services\Actions\Facades\ClientActions;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Services\Actions\Facades\EmployeeActions;
use App\Services\Actions\Facades\StructureActions;
use App\Services\Actions\Facades\SessionActions;
use App\Services\Actions\Facades\InvitationActions;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Services\Actions\Facades\TrustedDeviceActions;
use App\Services\Actions\Facades\MedicamentActions;

class StructureActionsResource extends JsonResource
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

        return [
            'dropdown'=> [
                'edit'=> StructureActions::edit($structure),
                'destroy'=> StructureActions::destroy($structure),
            ],
            'show'=> StructureActions::show($structure),
            'edit'=> StructureActions::edit($structure),
            'update'=> StructureActions::update($structure),
            'destroy'=> StructureActions::destroy($structure),
            'setIcon'=> StructureActions::updateIcon($structure),
            
            'rescope'=> SessionActions::rescope($structure),

            'storeClient'=> ClientActions::store(),
            'storeInvitation'=> InvitationActions::store($structure),
            'storeMedicaments'=> MedicamentActions::batchStore(),
            
            'clients'=> ClientActions::index($structure),
            'employees'=> EmployeeActions::index($structure),
            'invitations'=> InvitationActions::index($structure),
            'devices'=> TrustedDeviceActions::index($structure),
            'medicaments'=> MedicamentActions::index(),
        ];
    }
}
