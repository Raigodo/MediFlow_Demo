<?php

use App\Models\TrustedDevice;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TrustedDeviceController;

Route::prefix("structures/{structure}/devices")
    ->middleware(['auth','trusted','verified','manager'])
    ->group(function ()
    {

        Route::get('/', [TrustedDeviceController::class, 'index'])
            ->middleware([
                'can:list,'.TrustedDevice::class.',structure',
                'select.structure',
            ])
            ->name('device.index');


        Route::put('trust', [TrustedDeviceController::class,'trust'])
            ->middleware('can:create,'.TrustedDevice::class)
            ->name('device.trust');


        Route::delete('untrust', [TrustedDeviceController::class,'untrust'])
            ->middleware('can:create,'.TrustedDevice::class)
            ->name('device.untrust');


        Route::get('{device}', [TrustedDeviceController::class,'show'])
            ->middleware([
                'can:view,'.TrustedDevice::class.',device',
                'select.structure',
                'select.device',
            ])
            ->name('device.show');


        Route::get('{device}/edit', [TrustedDeviceController::class,'edit'])
            ->middleware([
                'can:update,'.TrustedDevice::class.',device',
                'select.structure',
                'select.device',
            ])
            ->name('device.edit');


        Route::patch('{device}', [TrustedDeviceController::class,'update'])
            ->middleware('can:update,'.TrustedDevice::class.',device')
            ->name('device.update');


        Route::delete('{device}', [TrustedDeviceController::class,'destroy'])
            ->middleware('can:delete,'.TrustedDevice::class.',device')
            ->name('device.destroy');

    });

