<?php

namespace App\Services\DataAccess\Repositories;

use App\Models\Note;
use App\Models\Client;
use App\Enums\FilterNoteFlag;
use Illuminate\Support\Carbon;
use App\Services\CurrentContext;

class NoteRepository
{

    public function paginated(string $client_id, array $filter)
    {
        $created_from = $filter['created_from'];
        $created_to = $filter['created_to'];
        $creator = $filter['creator'];
        $role = $filter['role'];
        $flag = $filter['flag'];
        $page = $filter['page'];

        $query = Note::query()
            ->with([
                'creator',
                'creator.structure',
                'creator.user',
                'client',
                'client.structure',
            ])
            ->where([
                    'client_id'=> $client_id,
                ])
            ->whereHas('creator', function ($query) use ($role) {
                    $query->where(['role'=> $role]);
                })
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

        if ($flag) {
            $flagFilterValue = FilterNoteFlag::tryFrom($flag);
            if ($flagFilterValue && $flagFilterValue !== FilterNoteFlag::ALL) {
                $query->where(
                    'is_important',
                    $flagFilterValue === FilterNoteFlag::IMPORTANT);
            }
        }
        $pagination = $query->paginate(
                perPage: 30,
                page: $page,
            );

        return $pagination;
    }

    public function todaysDetails(string $client_id, string $creator_id)
    {
        return Note::with([
                'creator',
                'client',
                'ambulance_calls',
                'ambulance_calls.note',
                'ambulance_calls.creator',
                'ambulance_calls.client',
                'diagnoses',
                'diagnoses.note',
                'diagnoses.creator',
                'diagnoses.client',
                'measurements',
                'measurements.note',
                'measurements.measurement_type',
                'measurements.creator',
                'measurements.client',
                'medications',
                'medications.medicament',
                'medications.medicament.medicament_type',
                'medications.medicament.structure',
                'medications.note',
                'medications.medicament_type',
                'medications.creator',
                'medications.client',
            ])->where([
                'client_id'=> $client_id,
                'creator_id'=> $creator_id,
            ])
            ->whereDate('created_at', Carbon::today())
            ->first();
    }



    public function find(string $id)
    {
        return Note::find($id);
    }

    public function findPreview(string $id)
    {
        return Note::with([
                'creator',
                'client',
            ])->find($id);
    }


    public function findDetail(string $id)
    {
        return Note::with([
                'creator',
                'client',
                'ambulance_calls',
                'ambulance_calls.note',
                'ambulance_calls.creator',
                'ambulance_calls.client',
                'diagnoses',
                'diagnoses.note',
                'diagnoses.creator',
                'diagnoses.client',
                'measurements',
                'measurements.note',
                'measurements.measurement_type',
                'measurements.creator',
                'measurements.client',
                'medications',
                'medications.medicament',
                'medications.medicament.medicament_type',
                'medications.medicament.structure',
                'medications.note',
                'medications.medicament_type',
                'medications.creator',
                'medications.client',
            ])->find($id);
    }

    public function create(array $data): Note
    {
        return Note::factory()->create($data);
    }


    public function make(string $client_id): Note
    {
        $employee_id = CurrentContext::employeeId();
        return Note::factory()->make([
            'creator_id'=> $employee_id,
            'client_id'=> $client_id,
        ]);
    }


    public function update(string $id, array $data): Note|null
    {
        $record = Note::find($id) ?? abort(404);
        if ($record) {
            $record->update($data);
            return $record;
        }

        return null;
    }

    public function delete(string $id)
    {
        $record = Note::find($id) ?? abort(404);
        if ($record) {
            return $record->delete();
        }
    }
}
