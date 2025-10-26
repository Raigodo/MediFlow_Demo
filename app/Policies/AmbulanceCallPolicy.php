<?php

namespace App\Policies;

use App\Models\AmbulanceCall;
use App\Models\Note;
use App\Models\User;
use App\Models\Client;
use App\Services\CurrentContext;
use Illuminate\Support\Facades\Gate;
use App\Services\DataAccess\Facades\Notes;
use App\Services\DataAccess\Facades\AmbulanceCalls;

class AmbulanceCallPolicy
{

    public function list(User $user, $client)
    {
        return Gate::authorize('view', [
            Client::class,
            $client,
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

    public function view(User $user, $client, $ambulance_call)
    {
        $client_id = $client instanceof Client ? $client->id : $client;

        $ambulance_call instanceof AmbulanceCall
            ? $ambulance_call
            : AmbulanceCalls::find($client_id, $ambulance_call) ?? abort(404);

        return Gate::authorize('view', [
            Client::class,
            $client,
        ]);
    }


    public function update(User $user, $client, $ambulance_call)
    {
        $client_id = $client instanceof Client ? $client->id : $client;

        $ambulance_call instanceof AmbulanceCall
            ? $ambulance_call
            : AmbulanceCalls::find($client_id, $ambulance_call) ?? abort(404);

        return Gate::authorize('update', [
            Note::class,
            $client,
            $ambulance_call->note,
        ]);
    }


    public function delete(User $user, $client, $ambulance_call)
    {
        $client_id = $client instanceof Client ? $client->id : $client;

        $ambulance_call instanceof AmbulanceCall
            ? $ambulance_call
            : AmbulanceCalls::find($client_id, $ambulance_call) ?? abort(404);

        return Gate::authorize('update', [
            Note::class,
            $client,
            $ambulance_call->note,
        ]);
    }

}
