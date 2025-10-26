<?php

namespace App\Services\DataAccess\Repositories;

use App\Models\MeasurementType;

class MeasurementTypeRepository 
{

    public function paginated(string $client_id, array $filter)
    {
        $page = $filter['page'];

        $query = MeasurementType::query();

        $pagination = $query->paginate(
                perPage: 20,
                page: $page,
            );

        return $pagination;
    }
    

    public function all(){
        return MeasurementType::get();
    }


    public function find(string $id)
    {
        return MeasurementType::find($id);
    }


    public function findDetail(string $id)
    {
        return MeasurementType::find($id);
    }

    public function create(array $data)
    {
        return MeasurementType::factory()->create($data);
    }

    public function update(string $id, array $data)
    {
        $record = MeasurementType::find($id) ?? abort(404);
        if ($record) {
            $record->update($data);
            return $record;
        }
        return null;
    }

    public function delete(string $id)
    {
        $record = MeasurementType::find($id) ?? abort(404);
        if ($record) {
            return $record->delete();
        }

        return false;
    }
}
