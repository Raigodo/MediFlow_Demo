<?php

namespace App\Services\DataAccess\Repositories;

use App\Models\AmbulanceCall;
use App\Models\MedicamentType;
use Illuminate\Support\Carbon;

class MedicamentTypeRepository 
{

    public function paginated(string $client_id, array $filter)
    {
        $page = $filter['page'];

        $query = MedicamentType::query();

        $pagination = $query->paginate(
                perPage: 20,
                page: $page,
            );

        return $pagination;
    }
    

    public function all(){
        return MedicamentType::get();
    }


    public function find(string $id)
    {
        return MedicamentType::find($id);
    }


    public function findDetail(string $id)
    {
        return MedicamentType::find($id);
    }

    public function create(array $data)
    {
        return MedicamentType::factory()->create($data);
    }

    public function update(string $id, array $data)
    {
        $record = MedicamentType::find($id) ?? abort(404);
        if ($record) {
            $record->update($data);
            return $record;
        }
        return null;
    }

    public function delete(string $id)
    {
        $record = MedicamentType::find($id) ?? abort(404);
        if ($record) {
            return $record->delete();
        }

        return false;
    }
}
