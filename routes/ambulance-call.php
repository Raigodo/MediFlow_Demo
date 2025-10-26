<?php

use App\Http\Controllers\AmbulanceCallController;
use App\Models\AmbulanceCall;
use Illuminate\Support\Facades\Route;


Route::prefix("clients/{client}")
    ->middleware(['auth','trusted','verified'])
    ->group(function ()
    {

        Route::get("ambulance-calls",[AmbulanceCallController::class,"index"])
            ->middleware([
                'can:list,'.AmbulanceCall::class.',client',
                'select.client',
                'client-sidelist.client',
            ])
            ->name("ambulance-call.index");

    });
