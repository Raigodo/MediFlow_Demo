<?php

namespace App\Services\DataAccess\Repositories;

use App\Models\Client;
use Illuminate\Support\Carbon;

class ClientRepository 
{

    public function paginated(string $structure_id, array $filter)
    {
        $created_from = $filter['created_from'];
        $created_to = $filter['created_to'];
        $archived = $filter['archived'];
        $archived_from = $filter['archived_from'];
        $archived_to = $filter['archived_to'];
        $page = $filter['page'];

        $query = Client::query()
            ->with([
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

        if ($archived || $archived_from || $archived_to) {
            $query->whereNotNull('archived_on');
        }
        else{
            $query->whereNull('archived_on');
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
        return Client::with([
                'structure',
            ])->where([
                'structure_id'=> $structure_id,
            ])
            ->whereNull('archived_on')
            ->get();
    }


    public function find(string $id)
    {
        return Client::find($id);
    }


    public function findDetail(string $id)
    {
        return Client::with([
                'contacts',
                'structure',
            ])->find($id);
    }

    public function create(array $data)
    {
        return Client::factory()->create($data);
    }

    public function update(string $id, array $data)
    {
        $record = Client::find($id) ?? abort(404);
        if ($record) {
            $record->update($data);
            return $record;
        }

        return null;
    }

    public function delete(string $id)
    {
        $record = Client::find($id) ?? abort(404);
        if ($record) {
            return $record->delete();
        }

        return false;
    }
}
