<?php

namespace App\Providers;

use App\Services\Actions\NoteActionsFactory;
use App\Services\Actions\SessionActionsFactory;
use App\Services\Actions\StructureActionsFactory;
use App\Services\Actions\TrustedDeviceActionsFactory;
use App\Services\Actions\UserActionsFactory;
use Illuminate\Support\ServiceProvider;
use App\Services\Actions\AppActionsFactory;
use App\Services\Actions\ClientActionsFactory;
use App\Services\Actions\DiagnoseActionsFactory;
use App\Services\Actions\EmployeeActionsFactory;
use App\Services\Actions\InvitationActionsFactory;
use App\Services\Actions\MedicamentActionsFactory;
use App\Services\Actions\MedicationActionsFactory;
use App\Services\Actions\MeasurementActionsFactory;
use App\Services\Actions\AmbulanceCallActionsFactory;

class ResourceServiceProvider extends ServiceProvider
{

    public function register(): void
    {
        $this->app->singleton(AmbulanceCallActionsFactory::class);
        $this->app->singleton(AppActionsFactory::class);
        $this->app->singleton(ClientActionsFactory::class);
        $this->app->singleton(DiagnoseActionsFactory::class);
        $this->app->singleton(EmployeeActionsFactory::class);
        $this->app->singleton(InvitationActionsFactory::class);
        $this->app->singleton(MeasurementActionsFactory::class);
        $this->app->singleton(MedicamentActionsFactory::class);
        $this->app->singleton(MedicationActionsFactory::class);
        $this->app->singleton(NoteActionsFactory::class);
        $this->app->singleton(SessionActionsFactory::class);
        $this->app->singleton(StructureActionsFactory::class);
        $this->app->singleton(TrustedDeviceActionsFactory::class);
        $this->app->singleton(UserActionsFactory::class);
    }


    public function boot(): void
    {
        //
    }
}
