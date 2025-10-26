<?php

use App\Models\Medicament;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MedicamentController;

Route::prefix("medicaments")
    ->middleware(['auth','trusted','verified'])
    ->group(function ()
    {

        Route::get('/', [MedicamentController::class, 'index'])
            ->middleware('can:list,'.Medicament::class)
            ->name('medicament.index');
            

        Route::get('supply', [MedicamentController::class,'supply'])
            ->middleware('can:supply,'.Medicament::class)
            ->name('medicament.supply');
            

        Route::get('{medicament}', [MedicamentController::class,'show'])
            ->middleware('can:view,'.Medicament::class.',medicament')
            ->middleware([
                'select.medicament',
            ])
            ->name('medicament.show');
            

        Route::post('/', [MedicamentController::class,'batchStore'])
            ->middleware('can:supply,'.Medicament::class)
            ->name('medicament.batch-store');

    });

