<?php

namespace App\Services\DataAccess\Repositories;

use App\Models\Diagnose;
use Illuminate\Support\Carbon;

class DiagnoseRepository 
{

    public function paginated(string $client_id, array $filter)
    {
        $created_from = $filter['created_from'];
        $created_to = $filter['created_to'];
        $archived = $filter['archived'];
        $archived_from = $filter['archived_from'];
        $archived_to = $filter['archived_to'];
        $creator = $filter['creator'];
        $page = $filter['page'];

        $query = Diagnose::query()
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


    public function find(string $id)
    {
        return Diagnose::find($id);
    }


    public function findDetail(string $id)
    {
        return Diagnose::with([
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
        return Diagnose::factory()->create($data);
    }

    public function update(string $id, array $data)
    {
        $record = Diagnose::find($id) ?? abort(404);
        if ($record) {
            $record->update($data);
            return $record;
        }

        return null;
    }

    public function delete(string $id)
    {
        $record = Diagnose::find($id) ?? abort(404);
        if ($record) {
            return $record->delete();
        }

        return false;
    }
}
