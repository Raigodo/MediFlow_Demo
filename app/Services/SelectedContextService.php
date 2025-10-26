<?php

namespace App\Services;

use Inertia\Inertia;
use Illuminate\Support\Str;
use App\Http\Resources\Note\NoteDetailResource;
use App\Http\Resources\User\UserDetailResource;
use App\Http\Resources\Client\ClientDetailResource;
use App\Http\Resources\Note\TempNoteDetailResource;
use App\Http\Resources\Diagnose\DiagnoseDetailResource;
use App\Http\Resources\Employee\EmployeeDetailResource;
use App\Http\Resources\Structure\StructureDetailResource;
use App\Http\Resources\Devices\TrustedDeviceDetailResource;
use App\Http\Resources\Invitation\InvitationDetailResource;
use App\Http\Resources\Medicament\MedicamentDetailResource;
use App\Http\Resources\Medication\MedicationDetailResource;
use App\Http\Resources\Measurement\MeasurementDetailResource;
use App\Http\Resources\AmbulanceCall\AmbulanceCallDetailResource;


class SelectedContextService 
{

    private array $selected = [];


    public function ambulanceCall($model = null)
    {
        if ($model){
            return $this->setSelectedModel('ambulance_call', $model, AmbulanceCallDetailResource::class);
        }
        return $this->getSelected('ambulance_call');
    }

    public function client($model = null)
    {
        if ($model){
            return $this->setSelectedModel('client', $model, ClientDetailResource::class);
        }
        return $this->getSelected('client');
    }

    public function diagnose($model = null)
    {
        if ($model){
            return $this->setSelectedModel('diagnose', $model, DiagnoseDetailResource::class);
        }
        return $this->getSelected('diagnose');
    }

    public function employee($model = null)
    {
        if ($model){
            return $this->setSelectedModel('employee', $model, EmployeeDetailResource::class);
        }
        return $this->getSelected('employee');
    }

    public function invitation($model = null)
    {
        if ($model){
            return $this->setSelectedModel('invitation', $model, InvitationDetailResource::class);
        }
        return $this->getSelected('invitation');
    }

    public function measurement($model = null)
    {
        if ($model){
            return $this->setSelectedModel('measurement', $model, MeasurementDetailResource::class);
        }
        return $this->getSelected('measurement');
    }

    public function medicament($model = null)
    {
        if ($model){
            return $this->setSelectedModel('medicament', $model, MedicamentDetailResource::class);
        }
        return $this->getSelected('medicament');
    }

    public function medication($model = null)
    {
        if ($model){
            return $this->setSelectedModel('medication', $model, MedicationDetailResource::class);
        }
        return $this->getSelected('medication');
    }

    public function note($model = null)
    {
        if ($model){
            return $this->setSelectedModel('note', $model, NoteDetailResource::class);
        }
        return $this->getSelected('note');
    }

    public function tempNote($model = null)
    {
        if ($model){
            return $this->setSelectedModel('temp_note', $model, TempNoteDetailResource::class);
        }
        return $this->getSelected('temp_note');
    }

    public function structure($model = null)
    {
        if ($model){
            return $this->setSelectedModel('structure', $model, StructureDetailResource::class);
        }
        return $this->getSelected('structure');
    }

    public function device($model = null)
    {
        if ($model){
            return $this->setSelectedModel('device', $model, TrustedDeviceDetailResource::class);
        }
        return $this->getSelected('device');
    }

    public function user($model = null)
    {
        if ($model){
            return $this->setSelectedModel('user', $model, UserDetailResource::class);
        }
        return $this->getSelected('user');
    }


    public function setSelectedModel(string $name, $model, $resource_class)
    {
        $keyName = Str::camel($name);
        $resource = new $resource_class($model);

        Inertia::share('selected.'.$keyName, function () use ($resource) {
                return $resource;
            });

        $this->selected[$name] = $model;
    }


    public function setSelectedValue(string $name, $value)
    {
        $keyName = Str::camel($name);

        Inertia::share('selected.'.$keyName, function () use ($value) {
                return $value;
            });

        $this->selected[$name] = $value;
    }


    public function getSelected(string $name)
    {
        if (isset($this->selected[$name])){
            return $this->selected[$name];
        }
        return null;
    }

}
