<?php

namespace App\Services\DataAccess\Repositories;

use App\Models\Invitation;
use Illuminate\Support\Carbon;

class InvitationRepository
{

    public function paginated(string $structure_id, array $filter)
    {
        $created_from = $filter['created_from'];
        $created_to = $filter['created_to'];
        $used = $filter['used'];
        $page = $filter['page'];

        $query = Invitation::query()
            ->with([
                'created_employee',
                'created_employee.structure',
                'created_employee.user',
                'structure',
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

        if ($used) {
            $query->where(['used'=> true]);
        }

        $pagination = $query->paginate(
                perPage: 20,
                page: $page,
            );

        return $pagination;
    }


    public function find(string $id)
    {
        return Invitation::where([
            'id'=> $id,
        ])->first();
    }


    public function findByToken(string $structure_id, string $token_value)
    {
        return Invitation::where([
                'structure_id'=> $structure_id,
                'token_value'=> $token_value,
            ])->first();
    }


    public function findDetail(string $id)
    {
        return Invitation::with([
                'structure',
                'created_employee',
                'created_employee.structure',
                'created_employee.user',
            ])->where([
                'id'=> $id,
            ])->first();
    }

    public function create(array $data)
    {
        return Invitation::factory()->create($data);
    }

    public function update(string $id, array $data)
    {
        $record = Invitation::find($id) ?? abort(404);
        if ($record) {
            $record->update($data);
            return $record;
        }

        return null;
    }

    public function delete(string $id)
    {
        $record = Invitation::find($id) ?? abort(404);
        if ($record) {
            return $record->delete();
        }

        return false;
    }
}
