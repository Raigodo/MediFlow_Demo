<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\DataAccess\Repositories\NoteRepository;
use App\Services\DataAccess\Repositories\UserRepository;
use App\Services\DataAccess\Repositories\ClientRepository;
use App\Services\DataAccess\Repositories\DiagnoseRepository;
use App\Services\DataAccess\Repositories\EmployeeRepository;
use App\Services\DataAccess\Repositories\StructureRepository;
use App\Services\DataAccess\Repositories\InvitationRepository;
use App\Services\DataAccess\Repositories\MedicamentRepository;
use App\Services\DataAccess\Repositories\MedicationRepository;
use App\Services\DataAccess\Repositories\MeasurementRepository;
use App\Services\DataAccess\RepositoryCache\NoteRepositoryCache;
use App\Services\DataAccess\RepositoryCache\UserRepositoryCache;
use App\Services\DataAccess\Repositories\AmbulanceCallRepository;
use App\Services\DataAccess\Repositories\TrustedDeviceRepository;
use App\Services\DataAccess\Repositories\MedicamentTypeRepository;
use App\Services\DataAccess\RepositoryCache\ClientRepositoryCache;
use App\Services\DataAccess\Repositories\MeasurementTypeRepository;
use App\Services\DataAccess\RepositoryCache\DiagnoseRepositoryCache;
use App\Services\DataAccess\RepositoryCache\EmployeeRepositoryCache;
use App\Services\DataAccess\RepositoryCache\StructureRepositoryCache;
use App\Services\DataAccess\RepositoryCache\InvitationRepositoryCache;
use App\Services\DataAccess\RepositoryCache\MedicamentRepositoryCache;
use App\Services\DataAccess\RepositoryCache\MedicationRepositoryCache;
use App\Services\DataAccess\RepositoryCache\MeasurementRepositoryCache;
use App\Services\DataAccess\RepositoryCache\AmbulanceCallRepositoryCache;
use App\Services\DataAccess\RepositoryCache\TrustedDeviceRepositoryCache;
use App\Services\DataAccess\RepositoryCache\MedicamentTypeRepositoryCache;
use App\Services\DataAccess\RepositoryCache\MeasurementTypeRepositoryCache;

class RepositoryServiceProvider extends ServiceProvider
{

    public function register(): void
    {
        $this->app->singleton(AmbulanceCallRepositoryCache::class);
        $this->app->singleton(ClientRepositoryCache::class);
        $this->app->singleton(DiagnoseRepositoryCache::class);
        $this->app->singleton(EmployeeRepositoryCache::class);
        $this->app->singleton(InvitationRepositoryCache::class);
        $this->app->singleton(MeasurementRepositoryCache::class);
        $this->app->singleton(MedicamentRepositoryCache::class);
        $this->app->singleton(MedicationRepositoryCache::class);
        $this->app->singleton(NoteRepositoryCache::class);
        $this->app->singleton(StructureRepositoryCache::class);
        $this->app->singleton(TrustedDeviceRepositoryCache::class);
        $this->app->singleton(UserRepositoryCache::class);
        $this->app->singleton(MeasurementTypeRepositoryCache::class);
        $this->app->singleton(MedicamentTypeRepositoryCache::class);

        $this->app->singleton(AmbulanceCallRepository::class);
        $this->app->singleton(ClientRepository::class);
        $this->app->singleton(DiagnoseRepository::class);
        $this->app->singleton(EmployeeRepository::class);
        $this->app->singleton(InvitationRepository::class);
        $this->app->singleton(MeasurementRepository::class);
        $this->app->singleton(MedicamentRepository::class);
        $this->app->singleton(MedicationRepository::class);
        $this->app->singleton(NoteRepository::class);
        $this->app->singleton(StructureRepository::class);
        $this->app->singleton(TrustedDeviceRepository::class);
        $this->app->singleton(UserRepository::class);
        $this->app->singleton(MeasurementTypeRepository::class);
        $this->app->singleton(MedicamentTypeRepository::class);
    }


    public function boot(): void
    {
        //
    }
}
