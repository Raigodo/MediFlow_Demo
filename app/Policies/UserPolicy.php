<?php

namespace App\Policies;

use App\Models\User;
use App\Services\CurrentContext;

class UserPolicy
{

    public function list(User $user)
    {
        return !!CurrentContext::adminId();
    }


    public function view(User $current_user, $user)
    {
        $is_admin = !!CurrentContext::adminId();
        if ($is_admin) return true;

        $user_id = $user instanceof User ? $user->id : $user;
        $is_same_user = $user_id === $current_user->id;
        return $is_same_user;
    }

    
    public function create(User $user)
    {
        return !!CurrentContext::adminId();
    }


    public function update(User $current_user, $user)
    {
        $is_admin = !!CurrentContext::adminId();
        if ($is_admin) return true;

        $user_id = $user instanceof User ? $user->id : $user;
        $is_same_user = $user_id === $current_user->id;
        return $is_same_user;
    }


    public function delete(User $current_user, $user)
    {
        $is_admin = !!CurrentContext::adminId();
        if ($is_admin) return true;

        $user_id = $user instanceof User ? $user->id : $user;
        $is_same_user = $user_id === $current_user->id;
        return $is_same_user;
    }

}
