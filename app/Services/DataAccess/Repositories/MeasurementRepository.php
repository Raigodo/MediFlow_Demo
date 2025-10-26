<?php

namespace App\Services\DataAccess\Repositories;

use App\Models\Measurement;
use Illuminate\Support\Carbon;

class MeasurementRepository 
{

    public function paginated(string $client_id, array $filter)
    {
        $created_from = $filter['created_from'];
        $created_to = $filter['created_to'];
        $creator = $filter['creator'];
        $type = $filter['type'];
        $page = $filter['page'];

        $query = Measurement::query()
            ->with([
                'measurement_type',
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

        if ($type) {
            $query->where(['measurement_type_id'=> $type]);
        }

        $pagination = $query->paginate(
                perPage: 20,
                page: $page,
            );

        return $pagination;
    }


    public function find(string $id)
    {
        return Measurement::find($id);
    }


    public function findDetail(string $id)
    {
        return Measurement::with([
                'measurement_type',
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
        return Measurement::factory()->create($data);
    }

    public function update(string $id, array $data)
    {
        $record = Measurement::find($id) ?? abort(404);
        if ($record) {
            $record->update($data);
            return $record;
        }

        return null;
    }

    public function delete(string $id)
    {
        $record = Measurement::find($id) ?? abort(404);
        if ($record) {
            return $record->delete();
        }

        return false;
    }
}
