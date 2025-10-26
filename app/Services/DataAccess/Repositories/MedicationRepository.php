<?php

namespace App\Services\DataAccess\Repositories;

use App\Models\Medication;
use Illuminate\Support\Carbon;

class MedicationRepository 
{

    public function paginated(string $client_id, array $filter)
    {
        $created_from = $filter['created_from'];
        $created_to = $filter['created_to'];
        $creator = $filter['creator'];
        $page = $filter['page'];

        $query = Medication::query()
            ->with([
                'medicament_type',
                'medicament',
                'medicament.medicament_type',
                'medicament.structure',
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

    public function related(string $note_id)
    {
        return Medication::where([
            'note_id'=> $note_id,
        ])->get();
    }


    public function find(string $id)
    {
        return Medication::find($id);
    }


    public function findDetail(string $id)
    {
        return Medication::with([
                'medicament_type',
                'medicament',
                'medicament.medicament_type',
                'medicament.structure',
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
        return Medication::factory()->create($data);
    }

    public function update(string $id, array $data)
    {
        $record = Medication::find($id) ?? abort(404);
        if ($record) {
            $record->update($data);
            return $record;
        }

        return null;
    }

    public function delete(string $id)
    {
        $record = Medication::find($id) ?? abort(404);
        if ($record) {
            return $record->delete();
        }

        return false;
    }
}
