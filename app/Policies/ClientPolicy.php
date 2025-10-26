<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Client;
use App\Enums\UserRole;
use App\Models\Structure;
use App\Services\CurrentContext;
use Illuminate\Support\Facades\Gate;
use App\Services\DataAccess\Facades\Clients;

class ClientPolicy
{

    public function list(User $user)
    {
        return Gate::authorize('view', [
            Structure::class,
            CurrentContext::structureId(),
        ]);
    }

    public function prompt(User $user)
    {
        $has_structure = !!CurrentContext::structureId();
        return $has_structure;
    }

    public function create(User $user)
    {
        $has_structure = !!CurrentContext::structureId();
        $is_participating = CurrentContext::userRole() >= UserRole::EMPLOYEE->value;
        return $has_structure && $is_participating;
    }

    public function view(User $user, $client)
    {
        $client_model = $client instanceof Client
            ? $client
            : Clients::find($client) ?? abort(404);


        $same_structure = $client_model->structure_id === CurrentContext::structureId();
        return $same_structure;
    }


    public function update(User $user, $client)
    {
        $client_model = $client instanceof Client
            ? $client
            : Clients::find($client) ?? abort(404);

        $same_structure = $client_model->structure_id === CurrentContext::structureId();
        $is_client_active = $client_model->archived_on === null;
        return $is_client_active && $same_structure;
    }


    public function archive(User $user, $client)
    {
        $client_model = $client instanceof Client
            ? $client
            : Clients::find($client) ?? abort(404);

        $same_structure = $client_model->structure_id === CurrentContext::structureId();
        $is_client_active = $client_model->archived_on === null;
        return $is_client_active && $same_structure;
    }


    public function unarchive(User $user, $client)
    {
        $client_model = $client instanceof Client
            ? $client
            : Clients::find($client) ?? abort(404);

        $same_structure = $client_model->structure_id === CurrentContext::structureId();
        $is_client_active = $client_model->archived_on === null;
        return !$is_client_active && $same_structure;
    }

}
