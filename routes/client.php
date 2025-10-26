<?php

use App\Models\Client;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClientController;


Route::prefix('structures/{structure}/clients')
    ->group(function ()
    {
        Route::get('/', [ClientController::class, 'index'])
            ->middleware([
                'can:list,'.Client::class.',structure',
                'select.structure',
            ])
            ->name('client.index');
            

        Route::get('archived', [ClientController::class,'archived'])
            ->middleware([
                'can:list,'.Client::class.',structure',
            ])
            ->name('client.archived');
    });

Route::prefix("clients")
    ->middleware(['auth','trusted','verified'])
    ->group(function ()
    {

        Route::get('/', [ClientController::class,'prompt'])
            ->middleware([
                'can:prompt,'.Client::class,
                'client-sidelist.client',
            ])
            ->name('client.prompt');


        Route::get('{client}', fn($client_id)
            => to_route('client.data', $client_id))
            ->middleware('can:view,'.Client::class.',client')
            ->name('client.show');


        Route::get('{client}/show', [ClientController::class,'baseData'])
            ->middleware([
                'can:view,'.Client::class.',client',
                'select.client',
                'client-sidelist.client',
            ])
            ->name('client.data');


        Route::get('{client}/edit', [ClientController::class,'edit'])
            ->middleware([
                'can:update,'.Client::class.',client',
                'select.client',
                'client-sidelist.client',
            ])
            ->name('client.edit');


        Route::post('create', [ClientController::class,'store'])
            ->middleware('can:create,'.Client::class)
            ->name('client.store');


        Route::patch('{client}/update', [ClientController::class,'update'])
            ->middleware('can:update,'.Client::class.',client')
            ->name('client.update');


        Route::put('{client}/update/icon', [ClientController::class,'setIcon'])
            ->middleware('can:update,'.Client::class.',client')
            ->name('client.update.icon');
            

        Route::patch('{client}/archive', [ClientController::class,'archive'])
            ->middleware('can:archive,'.Client::class.',client')
            ->name('client.archive');
            

        Route::patch('{client}/unarchive', [ClientController::class,'unarchive'])
            ->middleware('can:unarchive,'.Client::class.',client')
            ->name('client.unarchive');

    });
