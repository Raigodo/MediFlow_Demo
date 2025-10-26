<?php

namespace App\Policies;

use App\Enums\UserRole;
use App\Models\TrustedDevice;
use App\Models\User;
use App\Models\Structure;
use App\Services\CurrentContext;
use App\Services\DataAccess\Facades\TrustedDevices;
use Illuminate\Support\Facades\Gate;

class TrustedDevicePolicy
{

    public function list(User $user)
    {
        $is_admin = !!CurrentContext::adminId();
        $is_manager = CurrentContext::userRole() >= UserRole::MANAGER->value;
        return ($is_manager || $is_admin) && Gate::authorize('view', [
            Structure::class,
            CurrentContext::structureId(),
        ]);
    }

    public function create(User $user)
    {
        $is_admin = !!CurrentContext::adminId();
        $is_manager = CurrentContext::userRole() >= UserRole::MANAGER->value;
        return $is_manager || $is_admin;
    }

    public function view(User $user, $trusted_device)
    {
        $trusted_device_model = $trusted_device instanceof TrustedDevice
            ? $trusted_device
            : TrustedDevices::find($trusted_device) ?? abort(404);

        $same_structure = $trusted_device_model->structure_id === CurrentContext::structureId();
        $is_admin = !!CurrentContext::adminId();
        $is_manager = CurrentContext::userRole() >= UserRole::MANAGER->value;

        return ($is_admin || $is_manager) && $same_structure;
    }


    public function update(User $user, $trusted_device)
    {
        $trusted_device_model = $trusted_device instanceof TrustedDevice
            ? $trusted_device
            : TrustedDevices::find($trusted_device) ?? abort(404);

        $same_structure = $trusted_device_model->structure_id === CurrentContext::structureId();
        $is_admin = !!CurrentContext::adminId();
        $is_manager = CurrentContext::userRole() >= UserRole::MANAGER->value;

        return ($is_admin || $is_manager) && $same_structure;
    }


    public function delete(User $user, $trusted_device)
    {
        $trusted_device_model = $trusted_device instanceof TrustedDevice
            ? $trusted_device
            : TrustedDevices::find($trusted_device) ?? abort(404);

        $same_structure = $trusted_device_model->structure_id === CurrentContext::structureId();
        $is_admin = !!CurrentContext::adminId();
        $is_manager = CurrentContext::userRole() >= UserRole::MANAGER->value;

        return ($is_admin || $is_manager) && $same_structure;
    }

}
