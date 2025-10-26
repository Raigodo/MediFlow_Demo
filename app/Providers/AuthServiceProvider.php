<?php

namespace App\Providers;

use App\Models\Note;
use Inertia\Inertia;
use App\Models\Client;
use App\Models\Diagnose;
use App\Models\Employee;
use App\Models\Structure;
use App\Gates\IsAdminGate;
use App\Models\Invitation;
use App\Models\Medicament;
use App\Models\Medication;
use App\Models\Measurement;
use App\Policies\NotePolicy;
use Inertia\ResponseFactory;
use App\Models\AmbulanceCall;
use App\Models\TrustedDevice;
use App\Gates\CanViewRoleGate;
use App\Policies\ClientPolicy;
use App\Policies\DiagnosePolicy;
use App\Policies\EmployeePolicy;
use App\Policies\StructurePolicy;
use App\Gates\StructureAccessGate;
use App\Policies\InvitationPolicy;
use App\Policies\MedicamentPolicy;
use App\Policies\MedicationPolicy;
use App\Policies\MeasurementPolicy;
use Illuminate\Support\Facades\Gate;
use App\Policies\AmbulanceCallPolicy;
use App\Policies\TrustedDevicePolicy;
use Illuminate\Support\ServiceProvider;
use App\Http\Resources\Session\SessionResource;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
        AmbulanceCall::class => AmbulanceCallPolicy::class, 
        Client::class => ClientPolicy::class,
        Diagnose::class => DiagnosePolicy::class,
        Employee::class => EmployeePolicy::class,
        Invitation::class => InvitationPolicy::class,
        Measurement::class => MeasurementPolicy::class,
        Medicament::class => MedicamentPolicy::class,
        Medication::class => MedicationPolicy::class,
        Note::class => NotePolicy::class,
        Structure::class => StructurePolicy::class,
        TrustedDevice::class => TrustedDevicePolicy::class,
    ];

    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }
    
    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        Gate::define('access-structure', StructureAccessGate::class);
        Gate::define('admin', IsAdminGate::class);
        Gate::define('view_role', CanViewRoleGate::class);
        
        Inertia::composer('*', function (ResponseFactory $inertia) {
            $inertia->with('session', new SessionResource());
        });
    }
}