<?php

namespace App\Policies;

use App\Models\User;
use App\Enums\UserRole;
use App\Models\Structure;
use App\Models\Invitation;
use App\Services\CurrentContext;
use Illuminate\Support\Facades\Gate;
use App\Services\DataAccess\Facades\Invitations;

class InvitationPolicy
{

    public function list(User $user)
    {
        $is_manager = CurrentContext::userRole() >= UserRole::MANAGER->value;
        return $is_manager && Gate::authorize('update', [
            Structure::class,
            CurrentContext::structureId(),
        ]);
    }

    public function create(User $user)
    {
        $is_manager = CurrentContext::userRole() >= UserRole::MANAGER->value;
        return $is_manager && Gate::authorize('update', [
            Structure::class,
            CurrentContext::structureId(),
        ]);
    }

    public function view(User $user, $invitation)
    {
        $invitation_model = $invitation instanceof Invitation
            ? $invitation
            : Invitations::find($invitation) ?? abort(404);

        $same_structure = $invitation_model->structure_id === CurrentContext::structureId();
        $is_admin = !!CurrentContext::adminId();
        $is_manager = CurrentContext::userRole() >= UserRole::MANAGER->value;
        return $same_structure && ($is_manager || $is_admin);
    }


    public function update(User $user, $invitation)
    {
        $invitation_model = $invitation instanceof Invitation
            ? $invitation
            : Invitations::find($invitation) ?? abort(404);

        $same_structure = $invitation_model->structure_id === CurrentContext::structureId();
        $is_admin = !!CurrentContext::adminId();
        $is_manager = CurrentContext::userRole() >= UserRole::MANAGER->value;
        return $same_structure && ($is_manager || $is_admin);
    }


    public function delete(User $user, $invitation)
    {
        $invitation_model = $invitation instanceof Invitation
            ? $invitation
            : Invitations::find($invitation) ?? abort(404);

        $same_structure = $invitation_model->structure_id === CurrentContext::structureId();
        $is_admin = !!CurrentContext::adminId();
        $is_manager = CurrentContext::userRole() >= UserRole::MANAGER->value;
        return $same_structure && ($is_manager || $is_admin);
    }

}
