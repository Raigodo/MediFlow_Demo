<?php

namespace App\Policies;

use App\Models\Note;
use App\Models\User;
use App\Models\Client;
use App\Models\Measurement;
use App\Services\CurrentContext;
use Illuminate\Support\Facades\Gate;
use App\Services\DataAccess\Facades\Notes;
use App\Services\DataAccess\Facades\Measurements;

class MeasurementPolicy
{

    public function list(User $user, $client)
    {
        return Gate::authorize('view', [
            Client::class,
            $client
        ]);
    }

    public function create(User $user, $client)
    {
        $can_write_note = Gate::allows('create', [
            Note::class,
            $client,
        ]);

        $client_id = $client instanceof Client ? $client->id : $client;
        $employee_id = CurrentContext::employeeId();
        $note = $employee_id
            ? Notes::todaysDetails($client_id, $employee_id)
            : null;
            
        $can_update_note = !$note
            ? true  
            : Gate::authorize('update', [
                Note::class,
                $client,
                $note,
            ]);
        return $can_write_note && $can_update_note;
    }

    public function view(User $user, $client, $measurement)
    {
        $client_id = $client instanceof Client ? $client->id : $client;
        $measurement_model = $measurement instanceof Measurement
            ? $measurement
            : Measurements::find($client_id, $measurement) ?? abort(404);

        return Gate::authorize('view', [
            Note::class,
            $measurement_model->client,
            $measurement_model->note,
        ]);
    }


    public function update(User $user, $client, $measurement)
    {
        $client_id = $client instanceof Client ? $client->id : $client;
        $measurement_model = $measurement instanceof Measurement
            ? $measurement
            : Measurements::find($client_id, $measurement) ?? abort(404);

        return Gate::authorize('update', [
            Note::class,
            $measurement_model->client,
            $measurement_model->note,
        ]);
    }


    public function delete(User $user, $client, $measurement)
    {
        $client_id = $client instanceof Client ? $client->id : $client;
        $measurement_model = $measurement instanceof Measurement
            ? $measurement
            : Measurements::find($client_id, $measurement) ?? abort(404);

        return Gate::authorize('update', [
            Note::class,
            $measurement_model->note,
        ]);
    }

}
