<?php

namespace App\Services\Actions;

use App\Models\Structure;
use App\Models\TrustedDevice;
use Illuminate\Support\Facades\Gate;


class TrustedDeviceActionsFactory 
{
    public function index(Structure $structure)
    {
        return [
            'can'=> Gate::allows('list', [
                TrustedDevice::class,
                $structure,
            ]),
            'method'=> 'GET',
            'url'=> route('device.index', [
                'structure'=> $structure->id,
            ]),
        ];
    }

    
    public function show(TrustedDevice $device)
    {
        return [
            'can'=> Gate::allows('view', [
                TrustedDevice::class,
                $device,
            ]),
            'method'=> 'GET',
            'url'=> route('device.show', [
                'structure'=> $device->structure_id,
                'device'=> $device->id,
            ]),
        ];
    }

    
    public function edit(TrustedDevice $device)
    {
        return [
            'can'=> Gate::allows('update', [
                TrustedDevice::class,
                $device,
            ]),
            'method'=> 'GET',
            'url'=> route('device.edit', [
                'structure'=> $device->structure_id,
                'device'=> $device->id,
            ]),
        ];
    }

    
    public function update(TrustedDevice $device)
    {
        return [
            'can'=> Gate::allows('update', [
                TrustedDevice::class,
                $device,
            ]),
            'method'=> 'PATCH',
            'url'=> route('device.update', [
                'structure'=> $device->structure_id,
                'device'=> $device->id,
            ]),
        ];
    }


    public function trust(Structure $structure)
    {
        return [
            'can'=> Gate::allows('create', [
                TrustedDevice::class,
            ]),
            'method'=> 'PUT',
            'url'=> route('device.trust', [
                'structure'=> $structure->id,
            ]),
        ];
    }


    public function untrust(Structure $structure)
    {
        return [
            'can'=> Gate::allows('create', [
                TrustedDevice::class,
            ]),
            'method'=> 'DELETE',
            'url'=> route('device.untrust', [
                'structure'=> $structure->id,
            ]),
        ];
    }

    
    public function destroy(TrustedDevice $device)
    {
        return [
            'can'=> Gate::allows('delete', [
                TrustedDevice::class,
                $device,
            ]),
            'method'=> 'DELETE',
            'url'=> route('device.untrust', [
                'structure'=> $device->structure_id,
                'device'=> $device->id,
            ]),
        ];
    }
    
}