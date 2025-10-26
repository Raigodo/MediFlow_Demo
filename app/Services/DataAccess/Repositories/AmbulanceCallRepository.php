<?php

namespace App\Services\DataAccess\Repositories;

use App\Models\AmbulanceCall;
use Illuminate\Support\Carbon;

class AmbulanceCallRepository 
{

    public function paginated(string $client_id, array $filter)
    {
        $created_from = $filter['created_from'];
        $created_to = $filter['created_to'];
        $creator = $filter['creator'];
        $page = $filter['page'];

        $query = AmbulanceCall::query()
            ->with([
                'creator',
                'creator.structure',
                'creator.user',
                'client',
                'client.structure',
                'note',
                'note.creator',
                'note.creator.structure',
                'note.creator.user',
                'note.client',
                'note.client.structure',
            ])
            ->where([
                'client_id'=> $client_id,
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

        if ($creator) {
            $query->where(['creator_id'=> $creator]);
        }

        $pagination = $query->paginate(
                perPage: 20,
                page: $page,
            );

        return $pagination;
    }


    public function find(string $id)
    {
        return AmbulanceCall::find($id);
    }


    public function findDetail(string $id)
    {
        return AmbulanceCall::with([
                'creator',
                'creator.structure',
                'creator.user',
                'client',
                'client.structure',
                'note',
                'note.creator',
                'note.creator.structure',
                'note.creator.user',
                'note.client',
                'note.client.structure',
            ])->find($id);
    }

    public function create(array $data)
    {
        return AmbulanceCall::factory()->create($data);
    }

    public function update(string $id, array $data)
    {
        $record = AmbulanceCall::find($id) ?? abort(404);
        if ($record) {
            $record->update($data);
            return $record;
        }
        return null;
    }

    public function delete(string $id)
    {
        $record = AmbulanceCall::find($id) ?? abort(404);
        if ($record) {
            return $record->delete();
        }

        return false;
    }
}
