<?php

use App\Http\Controllers\MeasurementController;
use App\Models\Measurement;
use Illuminate\Support\Facades\Route;


Route::prefix("clients/{client}/measurements")
    ->middleware(['auth','trusted','verified'])
    ->group(function ()
    {

        Route::get("/",[MeasurementController::class,"index"])
            ->middleware([
                'can:list,'.Measurement::class.',client',
                'select.client',
                'client-sidelist.client',
            ])
            ->name("measurement.index");

    });
