<?php

namespace App\Policies;

use App\Models\Medication;
use App\Models\Note;
use App\Models\User;
use App\Models\Client;
use App\Services\CurrentContext;
use Illuminate\Support\Facades\Gate;
use App\Services\DataAccess\Facades\Notes;
use App\Services\DataAccess\Facades\Medications;

class MedicationPolicy
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
        $employee_id = CurrentContext::employeeId();
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

    public function view(User $user, $client, $medication)
    {
        $client_id = $client instanceof Client ? $client->id : $client;
        $medication instanceof Medication
            ? $medication
            : Medications::find($client_id, $medication) ?? abort(404);
            
        return Gate::authorize('view', [
            Client::class,
            $client,
        ]);
    }


    public function update(User $user, $client, $medication)
    {
        $client_id = $client instanceof Client ? $client->id : $client;
        $medication instanceof Medication
            ? $medication
            : Medications::find($client_id, $medication) ?? abort(404);

        return Gate::authorize('update', [
            Note::class,
            $client,
            $medication->note,
        ]);
    }


    public function delete(User $user, $client_id, $medication_id)
    {
        $medication = Medications::find($client_id, $medication_id) ?? abort(404);
        return Gate::authorize('update', [
            Note::class,
            $medication->client,
            $medication->note,
        ]);
    }

}
