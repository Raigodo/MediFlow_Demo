<?php

namespace App\Http\Resources\Employee\Base;

use Illuminate\Http\Request;
use App\Services\CurrentContext;
use App\Services\SelectedContext;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Services\Actions\Facades\EmployeeActions;

class EmployeesActionsResource extends JsonResource
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
        $structure = SelectedContext::structure()
            ?? CurrentContext::structure();
            
        return [
            'dropdown'=> [
                //
            ],
            'list'=> EmployeeActions::index($structure),
        ];
    }
}
