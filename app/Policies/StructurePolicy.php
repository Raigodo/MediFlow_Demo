<?php

namespace App\Policies;

use App\Models\Structure;
use App\Models\User;
use App\Enums\UserRole;
use App\Services\CurrentContext;
use Illuminate\Support\Facades\Gate;
use App\Services\DataAccess\Facades\Structures;

class StructurePolicy
{

    public function list(User $_, $user)
    {
        return Gate::allows('view', [
            User::class,
            $user,
        ]);
    }

    public function create(User $user)
    {
        $is_admin = !!CurrentContext::adminId();
        if ($is_admin) return true;

        $is_manager = CurrentContext::userRole() >= UserRole::MANAGER->value;
        return $is_manager;
    }

    public function view(User $user, $structure)
    {
        $is_admin = !!CurrentContext::adminId();
        if ($is_admin) return true;

        $structure_id = $structure instanceof Structure ? $structure->id : $structure;
        $is_current = CurrentContext::structureId() === $structure_id;
        if (!$is_current){
            $structure_model = $structure instanceof Structure
                ? $structure
                : Structures::findDetail($structure_id) ?? abort(404);
            $is_current = $structure_model->managers->contains('user_id', $user->id);
        }
        return $is_current;
    }


    public function update(User $user, $structure)
    {
        $is_admin = !!CurrentContext::adminId();
        if ($is_admin) return true;

        $structure_id = $structure instanceof Structure ? $structure->id : $structure;
        $is_current = CurrentContext::structureId() === $structure_id;
        if (!$is_current){
            $structure_model = $structure instanceof Structure
                ? $structure
                : Structures::findDetail($structure_id) ?? abort(404);
            $is_current = $structure_model->managers->contains('user_id', $user->id);
        }
        $is_manager = CurrentContext::userRole() >= UserRole::MANAGER->value;
        return $is_current && $is_manager;
    }


    public function delete(User $user, $structure)
    {
        $is_admin = !!CurrentContext::adminId();
        if ($is_admin) return true;

        $structure_id = $structure instanceof Structure ? $structure->id : $structure;
        $is_managed = CurrentContext::structureId() === $structure_id;
        $is_manager = CurrentContext::userRole() >= UserRole::MANAGER->value;
        if (!$is_managed){
            $structure_model = $structure instanceof Structure
                ? $structure
                : Structures::findDetail($structure_id) ?? abort(404);
            $is_managed = $structure_model->managers->contains('user_id', $user->id);
        }
        return $is_managed && $is_manager;
    }

}
