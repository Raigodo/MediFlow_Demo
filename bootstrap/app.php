<?php

use App\Enums\UserRole;
use App\Http\Middleware\AppendEmployees;
use App\Http\Middleware\IsAdmin;
use Illuminate\Foundation\Application;
use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HasExactUserRole;
use App\Services\DataAccess\Facades\Notes;
use App\Services\DataAccess\Facades\Users;
use App\Http\Middleware\HasUserRoleOrHigher;
use App\Services\DataAccess\Facades\Clients;
use App\Http\Middleware\AppendClientSidelist;
use App\Http\Middleware\HandleInertiaRequests;
use App\Services\DataAccess\Facades\Diagnoses;
use App\Services\DataAccess\Facades\Employees;
use App\Http\Middleware\AppendSelectedResource;
use App\Http\Middleware\TransformRequestCasing;
use App\Http\Resources\Note\NoteDetailResource;
use App\Http\Resources\User\UserDetailResource;
use App\Services\DataAccess\Facades\Structures;
use App\Services\DataAccess\Facades\Invitations;
use App\Services\DataAccess\Facades\Medicaments;
use App\Services\DataAccess\Facades\Medications;
use App\Services\DataAccess\Facades\Measurements;
use App\Http\Resources\Client\ClientDetailResource;
use App\Services\DataAccess\Facades\AmbulanceCalls;
use App\Services\DataAccess\Facades\TrustedDevices;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use App\Http\Middleware\OnlyManagerOrWithDeviceCookie;
use App\Http\Resources\Diagnose\DiagnoseDetailResource;
use App\Http\Resources\Employee\EmployeeDetailResource;
use App\Http\Resources\Structure\StructureDetailResource;
use App\Http\Resources\Devices\TrustedDeviceDetailResource;
use App\Http\Resources\Invitation\InvitationDetailResource;
use App\Http\Resources\Medicament\MedicamentDetailResource;
use App\Http\Resources\Medication\MedicationDetailResource;
use App\Http\Resources\Measurement\MeasurementDetailResource;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use App\Http\Resources\AmbulanceCall\AmbulanceCallDetailResource;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware)
    {
        $middleware->redirectGuestsTo('auth/login');
        $middleware->redirectUsersTo('home');

        $middleware->encryptCookies(except: ['appearance', 'sidebar_state']);

        $middleware->web(append: [
            TransformRequestCasing::class,
            HandleAppearance::class,
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);

        $middleware->alias([
            'trusted'=>  OnlyManagerOrWithDeviceCookie::class,
            'manager'=>  HasUserRoleOrHigher::class.':'.UserRole::MANAGER->value,
            'admin'=>    IsAdmin::class,
            'employee'=> HasExactUserRole::class.':'.UserRole::EMPLOYEE->value,
            'client-sidelist.client'=> AppendClientSidelist::class.':show',
            'client-sidelist.journal'=> AppendClientSidelist::class.':notes',
            'append.employees'=> AppendEmployees::class,

            'select.ambulance_call'=> AppendSelectedResource::class.':'.AmbulanceCalls::class.','.AmbulanceCallDetailResource::class.',ambulance_call,client',
            'select.client'=> AppendSelectedResource::class.':'.Clients::class.','.ClientDetailResource::class.',client',
            'select.diagnose'=> AppendSelectedResource::class.':'.Diagnoses::class.','.DiagnoseDetailResource::class.',diagnose,client',
            'select.employee'=> AppendSelectedResource::class.':'.Employees::class.','.EmployeeDetailResource::class.',employee',
            'select.invitation'=> AppendSelectedResource::class.':'.Invitations::class.','.InvitationDetailResource::class.',invitation',
            'select.measurement'=> AppendSelectedResource::class.':'.Measurements::class.','.MeasurementDetailResource::class.',measurement,client',
            'select.medicament'=> AppendSelectedResource::class.':'.Medicaments::class.','.MedicamentDetailResource::class.',medicament',
            'select.medication'=> AppendSelectedResource::class.':'.Medications::class.','.MedicationDetailResource::class.',medication,client',
            'select.note'=> AppendSelectedResource::class.':'.Notes::class.','.NoteDetailResource::class.',note,client',
            'select.structure'=> AppendSelectedResource::class.':'.Structures::class.','.StructureDetailResource::class.',structure',
            'select.device'=> AppendSelectedResource::class.':'.TrustedDevices::class.','.TrustedDeviceDetailResource::class.',device',
            'select.user'=> AppendSelectedResource::class.':'.Users::class.','.UserDetailResource::class.',user',
        ]);

    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
