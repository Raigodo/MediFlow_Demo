<?php

namespace App\Services\DataAccess\Repositories;

use App\Models\Employee;
use Illuminate\Support\Carbon;
use App\Services\CurrentContext;

class EmployeeRepository 
{

    public function paginated(string $structure_id, array $filter)
    {
        $created_from = $filter['created_from'];
        $created_to = $filter['created_to'];
        $archived = $filter['archived'];
        $archived_from = $filter['archived_from'];
        $archived_to = $filter['archived_to'];
        $page = $filter['page'];

        $query = Employee::query()
            ->with([
                'structure',
                'user',
            ])
            ->where([
                'structure_id'=> $structure_id,
            ])
            ->orderByDesc('created_at');

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

        if ($archived || $archived_from || $archived_to) {
            $query->whereNotNull('archived_on');
        }

        if ($archived_from) {
            $query->where(
                'archived_on',
                '>=',
                Carbon::parse($archived_from)->startOfDay()
            );
        }

        if ($archived_to) {
            $query->where(
                'archived_on',
                '<=',
                Carbon::parse($archived_to)->startOfDay()
            );
        }

        $pagination = $query->paginate(
                perPage: 20,
                page: $page,
            );

        return $pagination;
    }

    public function all(string $structure_id){
        return Employee::where([
                'structure_id'=> $structure_id,
            ])
            ->whereNull('deactivated_at')
            ->get();
    }


    public function find(string $id)
    {
        return Employee::find($id);
    }

    
    public function findByStructure(string $structure_id, string $user_id)
    {
        return Employee::where([
                'user_id'=> $user_id,
                'structure_id'=> $structure_id,
            ])->first();
    }

    public function findDetail(string $id)
    {
        return Employee::with([
                'structure',
                'user',
            ])->find($id);
    }

    public function create(array $data)
    {
        return Employee::factory()->create($data);
    }

    public function update(string $id, array $data)
    {
        $record = Employee::find($id) ?? abort(404);
        if ($record) {
            $record->update($data);
            return $record;
        }

        return null;
    }

    public function delete(string $id)
    {
        $record = Employee::find($id) ?? abort(404);
        if ($record) {
            return $record->delete();
        }

        return false;
    }
}
