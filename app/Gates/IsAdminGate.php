<?php

namespace App\Gates;

use App\Models\User;
use App\Enums\UserRole;
use App\Services\CurrentContext;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class IsAdminGate
{
    /**
     * Determine if the user is admin.
     *
     * @param  \App\Models\User|null  $user
     * @return bool
     */
    public function __invoke(?User $user = null): bool
    {
        return Auth::check() && (
            CurrentContext::adminId()
            || CurrentContext::userRole() >= UserRole::ADMIN->value
        );
    }
}
