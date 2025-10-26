<?php

namespace App\Http\Resources\Employee;

use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Http\Resources\Json\ResourceCollection;
use App\Http\Resources\Employee\Base\EmployeesActionsResource;

class EmployeePreviewCollection extends ResourceCollection
{

    public function __construct(
        protected null|Collection|HasMany $employees
    ) {
        parent::__construct($employees ?? []);
    }

    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'data'=> $this->collection->toArray(),
            'actions'=> new EmployeesActionsResource(),
        ];
    }
}
