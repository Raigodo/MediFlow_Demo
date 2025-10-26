<?php

use App\Http\Controllers\SettingsController;
use Illuminate\Support\Facades\Route;

Route::prefix("settings")
    ->middleware(['auth'])
    ->group(function ()
    {

        Route::get('/', [SettingsController::class, 'index'])
            ->name('settings.index');

    });

