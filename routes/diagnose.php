<?php

use App\Models\Diagnose;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DiagnoseController;


Route::prefix("clients/{client}")
    ->middleware(['auth','trusted','verified'])
    ->group(function ()
    {

        Route::get("diagnoses",[DiagnoseController::class,"index"])
            ->middleware([
                'can:list,'.Diagnose::class.',client',
                'select.client',
                'client-sidelist.client',
            ])
            ->name("diagnose.index");


        Route::patch('notes/{note}/diagnoses/{diagnose}/archive', [DiagnoseController::class,'archive'])
            ->middleware('can:archive,'.Diagnose::class.',client,diagnose')
            ->name('diagnose.archive');

    });
