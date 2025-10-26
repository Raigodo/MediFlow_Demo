<?php

use App\Http\Controllers\MedicationController;
use App\Models\Medication;
use Illuminate\Support\Facades\Route;


Route::prefix("clients/{client}")
    ->middleware(['auth','trusted','verified'])
    ->group(function ()
    {

        Route::get("medications",[MedicationController::class,"index"])
            ->middleware([
                'can:list,'.Medication::class.',client',
                'select.client',
                'client-sidelist.client',
            ])
            ->name("medication.index");

    });
