<?php

namespace App\Http\Resources\Structure\Base;

use App\Models\Client;
use App\Models\Employee;
use App\Models\Structure;
use Illuminate\Http\Request;
use App\Models\TrustedDevice;
use Illuminate\Support\Facades\Gate;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


class StructureDetailSections extends JsonResource
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
            'baseData'=> [
                'can'=> Gate::allows('view', [
                    Structure::class,
                    $structure->id,
                ]),
                'url'=> route('structure.show', [
                    'structure'=> $structure,
                ])
            ],
            'clients'=> [
                'can'=> Gate::allows('list', [
                    Client::class,
                    $structure->id,
                ]),
                'url'=> route('client.index', [
                    'structure'=> $structure,
                ])
            ],
            'employees'=> [
                'can'=> Gate::allows('list', [
                    Employee::class,
                    $structure->id,
                ]),
                'url'=> route('employee.index', [
                    'structure'=> $structure,
                ])
            ],
            'invitations'=> [
                'can'=> Gate::allows('list', [
                    Employee::class,
                    $structure->id,
                ]),
                'url'=> route('invitation.index', [
                    'structure'=> $structure,
                ])
            ],
            'trustedDevices'=> [
                'can'=> Gate::allows('list', [
                    TrustedDevice::class,
                    $structure->id,
                ]),
                'url'=> route('device.index', [
                    'structure'=> $structure,
                ])
            ],
        ];
    }
}
