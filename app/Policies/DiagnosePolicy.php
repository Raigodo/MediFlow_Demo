<?php

namespace App\Policies;

use App\Models\Diagnose;
use App\Models\Note;
use App\Models\User;
use App\Models\Client;
use App\Enums\EmployeeRole;
use App\Services\CurrentContext;
use Illuminate\Support\Facades\Gate;
use App\Services\DataAccess\Facades\Notes;
use App\Services\DataAccess\Facades\Diagnoses;

class DiagnosePolicy
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

    public function view(User $user, $client, $diagnose)
    {
        $client_id = $client instanceof Client ? $client->id : $client;
        $diagnose instanceof Diagnose
            ? $diagnose
            : Diagnoses::find($client_id, $diagnose) ?? abort(404);

        return Gate::authorize('view', [
            Client::class,
            $client,
        ]);
    }


    public function update(User $user, $client, $diagnose)
    {
        $client_id = $client instanceof Client ? $client->id : $client;
        $diagnose_model = $diagnose instanceof Diagnose
            ? $diagnose
            : Diagnoses::find($client_id, $diagnose) ?? abort(404);

        return Gate::authorize('update', [
            Note::class,
            $client,
            $diagnose_model->note,
        ]);
    }


    public function delete(User $user, $client_id, $diagnose_id)
    {
        $diagnose = Diagnoses::find($client_id, $diagnose_id) ?? abort(404);
        return Gate::authorize('update', [
            Note::class,
            $diagnose->client,
            $diagnose->note,
        ]);
    }


    public function archive(User $user, $client, $diagnose)
    {
        $client_id = $client instanceof Client ? $client->id : $client;
        $diagnose instanceof Diagnose
            ? $diagnose
            : Diagnoses::find($client_id, $diagnose) ?? abort(404);

        $is_admin = !!CurrentContext::adminId();
        if ($is_admin) return true;

        $is_nurse = CurrentContext::employeeRole() >= EmployeeRole::NURSE->value;
        return $is_nurse;
    }

}
