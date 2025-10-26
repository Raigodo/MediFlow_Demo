<?php

namespace App\Policies;

use App\Models\Note;
use App\Models\User;
use App\Models\Client;
use App\Enums\UserRole;
use App\Models\Measurement;
use Illuminate\Support\Carbon;
use App\Services\CurrentContext;
use Illuminate\Support\Facades\Gate;
use App\Services\DataAccess\Facades\Notes;

class NotePolicy
{

    public function prompt(User $user)
    {
        $has_structure = !!CurrentContext::structureId();
        return $has_structure;
    }

    public function list(User $user, $client)
    {
        return Gate::authorize('view', [
            Client::class,
            $client
        ]);
    }

    public function view(User $user, $client, $note)
    {
        $client_id = $client instanceof Client ? $client->id : $client;
        $note_id = $note instanceof Note ? $note->id : $note;
        $note_model = $note instanceof Measurement
            ? $note
            : Notes::findPreview($client_id, $note_id) ?? abort(404);
        
        $does_structure_match = CurrentContext::structureId() === $note_model->client->structure_id;
        $is_admin = !!CurrentContext::adminId();
        $is_manager = CurrentContext::userRole() >= UserRole::MANAGER->value;
        $employee_role_plus = CurrentContext::employeeRole() >= $note_model->creator->role->value;

        return $does_structure_match 
            && ($employee_role_plus || $is_manager || $is_admin)
            && Gate::authorize('view', [
                Client::class,
                $note_model->client,
            ]);
    }

    public function create(User $user, $client)
    {
        $is_employee = CurrentContext::userRole() === UserRole::EMPLOYEE->value;
        return $is_employee
            && Gate::authorize('update', [
                Client::class,
                $client,
            ]);;
    }

    public function update(User $user, $client, $note)
    {
        $client_id = $client instanceof Client ? $client->id : $client;
        $note_id = $note instanceof Note ? $note->id : $note;
        $note_model = $note instanceof Measurement
            ? $note
            : Notes::findPreview($client_id, $note_id) ?? abort(404);

        $does_structure_match = CurrentContext::structureId() === $note_model->client->structure_id;
        $is_admin = !!CurrentContext::adminId();
        $is_creator = CurrentContext::employeeId() === $note_model->creator_id;
        $is_editable = $note_model->created_at->format('Y-m-d') === Carbon::now()->format('Y-m-d');

        return $does_structure_match && ($is_editable && ($is_creator || $is_admin));
    }

    public function forceUpdate(User $user, $client, $note)
    {
        $client_id = $client instanceof Client ? $client->id : $client;
        $note_id = $note instanceof Note ? $note->id : $note;
        $note_model = $note instanceof Measurement
            ? $note
            : Notes::findPreview($client_id, $note_id) ?? abort(404);

        $does_structure_match = CurrentContext::structureId() === $note_model->client->structure_id;
        $is_admin = !!CurrentContext::adminId();

        return $does_structure_match && $is_admin;
    }


    public function delete(User $user, $client, $note)
    {
        $client_id = $client instanceof Client ? $client->id : $client;
        $note_id = $note instanceof Note ? $note->id : $note;
        $note_model = $note instanceof Measurement
            ? $note
            : Notes::findPreview($client_id, $note_id) ?? abort(404);
        
        $does_structure_match = CurrentContext::structureId() === $note_model->client->structure_id;
        $is_admin = !!CurrentContext::adminId();
        $is_creator = CurrentContext::employeeId() === $note_model->creator_id;
        $is_editable = $note_model->created_at->format('Y-m-d') === Carbon::now()->format('Y-m-d');

        return $does_structure_match && ($is_admin || ($is_editable && $is_creator));
    }

}
