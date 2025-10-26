<?php

namespace App\Services\DataAccess\Repositories;

use App\Models\Medicament;

class MedicamentRepository 
{

    public function paginated(string $structure_id, array $filter)
    {
        $page = $filter['page'];

        $query = Medicament::query()
            ->with([
                'medicament_type',
                'structure',
            ])
            ->where([
                'structure_id'=> $structure_id,
            ])
            ->orderByDesc('created_at');

        $pagination = $query->paginate(
                perPage: 20,
                page: $page,
            );

        return $pagination;
    }

    public function all(string $structure_id)
    {
        return Medicament::with([
                'medicament_type',
                'structure',
            ])
            ->where([
                'structure_id'=> $structure_id,
            ])
            ->get();
    }

    public function find(string $id)
    {
        return Medicament::find($id);
    }

    public function findDetail(string $id)
    {
        return Medicament::with([
                'medicament_type',
                'structure',
            ])->find($id);
    }


    public function findByType(string $medicament_type_id, string $structure_id)
    {
        return Medicament::where([
            'medicament_type_id'=> $medicament_type_id,
            'structure_id'=> $structure_id,
        ])->first();
    }

    public function findDetailByType(string $medicament_type_id, string $structure_id)
    {
        return Medicament::with([
                'medicament_type',
                'structure',
            ])->where([
                'medicament_type_id'=> $medicament_type_id,
                'structure_id'=> $structure_id,
            ])->first();
    }

    public function create(array $data)
    {
        return Medicament::factory()->create($data);
    }

    public function update(string $id, array $data)
    {
        $record = Medicament::find($id) ?? abort(404);
        if ($record) {
            $record->update($data);
            return $record;
        }

        return null;
    }

    public function delete(string $id)
    {
        $record = Medicament::find($id) ?? abort(404);
        if ($record) {
            return $record->delete();
        }

        return false;
    }
}
