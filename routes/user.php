<?php

use App\Http\Controllers\PasswordController;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

Route::middleware(['auth', 'admin'])
    ->group(function () 
    {
        Route::get('users', [UserController::class, 'managers'])
            ->middleware('can:list,'.User::class)
            ->name('user.index');
    });


Route::middleware('auth')
    ->group(function ()
    {

        Route::get('profile/{user}', fn($user_id)
            => to_route('user.show', $user_id))
            ->middleware('can:view,'.User::class.',user');
            

        Route::get('profile/{user}/show', [UserController::class, 'show'])
            ->middleware('can:view,'.User::class.',user')
            ->middleware([
                'select.user',
            ])
            ->name('user.show');
            

        Route::get('profile/{user}/edit', [UserController::class, 'edit'])
            ->middleware('can:update,'.User::class.',user')
            ->middleware([
                'select.user',
            ])
            ->name('user.edit');
            

        Route::get('profile/{user}/edit/password', [PasswordController::class, 'editPassowrd'])
            ->middleware('can:update,'.User::class.',user')
            ->middleware([
                'select.user',
            ])
            ->name('user.password.edit');
            

        Route::post('users', [UserController::class, 'store'])
            ->middleware('can:create,'.User::class)
            ->name('user.store');
            

        Route::patch('profile/{user}/edit', [UserController::class, 'update'])
            ->middleware('can:update,'.User::class.',user')
            ->name('user.update');
            

        Route::put('profile/{user}/icon', [UserController::class, 'setIcon'])
            ->middleware('can:update,'.User::class.',user')
            ->name('user.update.icon');
            

        Route::delete('profile/{user}', [UserController::class, 'destroy'])
            ->middleware('can:delete,'.User::class.',user')
            ->name('user.destroy');
            

        Route::patch('profile/{user}/edit/password', [PasswordController::class, 'updatePassword'])
            ->middleware('can:update,'.User::class.',user')
            ->name('user.password.update');

    });
