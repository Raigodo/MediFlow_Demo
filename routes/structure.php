<?php

use App\Models\Structure;
use App\Services\CurrentContext;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StructureController;


Route::get('structures', function () {
    $user_id = CurrentContext::userId();
    return to_route('structure.index', $user_id);
});
            

Route::get('profile/{user}/structures', [StructureController::class, 'index'])
    ->middleware([
        'can:list,'.Structure::class.',user',
        'select.user',
    ])
    ->name('structure.list');


Route::get('structures/{structure}', function ($structure_id) {
    return to_route('structure.show', $structure_id);
});


Route::prefix("structures")
    ->middleware(['auth','trusted','verified'])
    ->group(function ()
    {


        Route::get('{structure}', function ($structure) {
            return to_route('structure.show', $structure);
        })
            ->middleware([
                'can:view,'.Structure::class.',structure',
            ])
            ->name('structure.index');


        Route::get('{structure}/show', [StructureController::class,'show'])
            ->middleware([
                'can:view,'.Structure::class.',structure',
                'select.structure',
            ])
            ->name('structure.show');

    });

Route::prefix("structures")
    ->middleware(['auth','manager','verified'])
    ->group(function ()
    {

        Route::post('/', [StructureController::class,'store'])
            ->middleware('can:create,'.Structure::class)
            ->name('structure.store');


        Route::prefix('{structure}')
            ->group(function ()
            {

                Route::get('edit', [StructureController::class,'edit'])
                    ->middleware([
                        'can:update,'.Structure::class.',structure',
                        'select.structure',
                    ])
                    ->name('structure.edit');
                    

                Route::patch('edit', [StructureController::class,'update'])
                    ->middleware('can:update,'.Structure::class.',structure')
                    ->name('structure.update');
                    

                Route::put('edit/icon', [StructureController::class,'setIcon'])
                    ->middleware('can:update,'.Structure::class.',structure')
                    ->name('structure.update.icon');
                    

                Route::delete('/', [StructureController::class, 'destroy'])
                    ->middleware('can:delete,'.Structure::class.',structure')
                    ->name('structure.destroy');

            });

    });



