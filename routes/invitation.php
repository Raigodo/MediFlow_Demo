<?php

use App\Models\Invitation;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\InvitationController;

Route::prefix("structures/{structure}/invitations")
    ->middleware(['auth','trusted','verified','manager'])
    ->group(function ()
    {

        Route::get('/', [InvitationController::class, 'index'])
            ->middleware([
                'can:list,'.Invitation::class,
                'select.structure',
            ])
            ->name('invitation.index');


        Route::get('{invitation}', [InvitationController::class,'show'])
            ->middleware([
                'can:view,'.Invitation::class.',invitation',
                'select.structure',
                'select.invitation',
            ])
            ->name('invitation.show');


        Route::get('{invitation}/edit', [InvitationController::class,'edit'])
            ->middleware([
                'can:update,'.Invitation::class.',invitation',
                'select.structure',
                'select.invitation',
            ])
            ->name('invitation.edit');


        Route::post('/', [InvitationController::class, 'store'])
            ->middleware('can:create,'.Invitation::class)
            ->name('invitation.store');


        Route::patch('{invitation}/edit', [InvitationController::class,'update'])
            ->middleware('can:update,'.Invitation::class.',invitation')
            ->name('invitation.update');


        Route::delete('{invitation}', [InvitationController::class, 'destroy'])
            ->middleware('can:delete,'.Invitation::class.',invitation')
            ->name('invitation.destroy');

    });

