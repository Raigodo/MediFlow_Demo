<?php

namespace App\Services\DataAccess\Repositories;

use App\Models\User;
use App\Enums\UserRole;
use App\Models\Structure;
use App\Models\TrustedDevice;
use Illuminate\Support\Carbon;
use App\Models\DefaultStructure;
use App\Services\CurrentContext;
use Illuminate\Support\Facades\Facade;

class StructureRepository
{

    public function paginated(string $user_id, array $filter)
    {
        $created_from = $filter['created_from'];
        $created_to = $filter['created_to'];
        $role = $filter['role'];
        $page = $filter['page'];

        $query = Structure::query()
            ->orderByDesc('created_at');

        if (!$role || ($role && $role === UserRole::MANAGER->value)) {
            $query->with([
                    'managers',
                    'managers.user',
                    'managers.structure',
                ])
                ->whereHas('managers', fn( $query)=> $query->where(['user_id'=> $user_id]),
                );
        }

        if ($role && $role === UserRole::MANAGER->value) {
            $query->where(['creator_id'=> $user_id]);
        }

        if ($created_from) {
            $query->where(
                'created_at',
                '>=',
                Carbon::parse($created_from)->startOfDay()
            );
        }

        if ($created_to) {
            $query->where(
                'created_at',
                '<=',
                Carbon::parse($created_to)->endOfDay()
            );
        }

        $pagination = $query->paginate(
                perPage: 20,
                page: $page,
            );

        return $pagination;
    }
    
    
    public function current()
    {
        $structure_id = CurrentContext::structureId();
        if ($structure_id === null) {
            return null;
        }
        return Structure::whereKey($structure_id)->first();
    }

    
    public function default(string $user_id)
    {
        return DefaultStructure::where([
            'user_id'=> $user_id,
        ])->first();
    }
    

    public function defaultPreview(string $user_id)
    {
        return DefaultStructure::with([
                'structure'
            ])->where([
                'user_id'=> $user_id,
            ])->first();
    }


    /**
     * Get all Structures this User manages.
     */
    public function managed(string $user_id)
    {
        $user_id = CurrentContext::userId();
        return User::with('managed_structures')
            ->whereKey($user_id)
            ->first()
            ?->managed_structures;
    }

    /**
     * Get all Structures this User is employed in.
     */
    public function employed(string $user_id): mixed
    {
        return User::with('employed_structures')
            ->whereKey($user_id)
            ->first()
            ?->employed_structures;
    }


    public function participating(string $user_id)
    {
        $managed = $this->managed($user_id);
        $employed = $this->employed($user_id);

        return $managed
            ->merge($employed)
            ->unique('id')
            ->values();
    }

    

    public function find(string $id)
    {
        return Structure::find($id);
    }


    public function findDetail(string $id)
    {
        return Structure::with([
                'managers',
                'managers.user',
                'managers.structure',
                'employees',
                'employees.structure',
                'employees.user',
                'medicament_manager',
                'medicament_manager.structure',
                'medicament_manager.employee',
                'medicament_manager.employee.structure',
                'medicament_manager.employee.user',
                'invitations',
                'invitations.created_employee',
                'invitations.created_employee.structure',
                'invitations.created_employee.user',
                'invitations.structure',
                'trusted_devices',
                'clients',
                'clients.structure',
            ])->find($id);
    }

    public function create(array $data)
    {
        return Structure::factory()->create($data);
    }

    public function update(string $id, array $data)
    {
        $record = Structure::find($id) ?? abort(404);
        if ($record) {
            $record->update($data);
            return $record;
        }

        return null;
    }

    public function delete(string $id)
    {
        $record = Structure::find($id) ?? abort(404);
        if ($record) {
            return $record->delete();
        }

        return false;
    }
}
