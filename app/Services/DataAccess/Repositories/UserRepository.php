<?php

namespace App\Services\DataAccess\Repositories;

use App\Models\User;
use Illuminate\Support\Carbon;
use App\Services\CurrentContext;

class UserRepository 
{
    public function paginated(array $filter)
    {
        $created_from = $filter['created_from'];
        $created_to = $filter['created_to'];
        $archived = $filter['archived'];
        $archived_from = $filter['archived_from'];
        $archived_to = $filter['archived_to'];
        $verified = $filter['verified'];
        $role = $filter['role'];
        $page = $filter['page'];

        $query = User::query()
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

        if ($verified) {
            $query->whereNotNull('email_verified_at');
        }

        if ($verified === false) {
            $query->whereNull('email_verified_at');
        }

        if ($role) {
            $query->where(['role'=> $role]);
        }

        $pagination = $query->paginate(
                perPage: 20,
                page: $page,
            );

        return $pagination;
    }

    public function current()
    {
        $user_id = CurrentContext::userId();
        return $this->find($user_id);
    }

    public function currentDetail()
    {
        $user_id = CurrentContext::userId();
        return $this->findDetail($user_id);
    }


    public function find(string $id)
    {
        return User::find($id);
    }

    public function findDetail(string $id)
    {
        return User::with([
                'managed_structures',
                'employed_structures',
            ])->where([
                'id'=> $id,
            ])->first();
    }

    public function create(array $data)
    {
        return User::factory()->create($data);
    }

    public function update(string $id, array $data)
    {
        $record = User::find($id) ?? abort(404);
        if ($record) {
            $record->update($data);
            return $record;
        }

        return null;
    }

    public function delete(string $id)
    {
        $record = User::find($id) ?? abort(404);
        if ($record) {
            return $record->delete();
        }

        return false;
    }
}
