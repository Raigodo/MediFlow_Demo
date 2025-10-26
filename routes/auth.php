<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\SessionController;
use App\Http\Controllers\Auth\RecoveryController;
use App\Http\Controllers\Auth\SecurityController;
use App\Http\Controllers\Auth\VerificationController;

Route::middleware('guest')
->prefix('auth')
->group(function ()
{
    
    Route::redirect('/', "auth/login")
        ->name('auth.index');


    Route::get('login', [SessionController::class, 'loginPage'])
        ->name('login.form');


    Route::post('login', [SessionController::class, 'login'])
        ->name('login.submit');


    Route::get('join', [SessionController::class, 'joinPage'])
        ->name('join.form');


    Route::post('join', [SessionController::class, 'join'])
        ->name('join.submit');


    Route::get('register', [SessionController::class, 'registerPage'])
        ->name('register.form');


    Route::post('register', [SessionController::class, 'register'])
        ->name('register.submit');


    Route::get('forgot-password', [RecoveryController::class, 'sendResetPasswordPage'])
        ->name('password.request');


    Route::post('forgot-password', [RecoveryController::class, 'sendResetPassword'])
        ->name('password.email');


    Route::get('reset-password/{token}', [RecoveryController::class, 'resetPasswordPage'])
        ->name('password.reset');


    Route::post('reset-password', [RecoveryController::class, 'resetpasswordAction'])
        ->name('password.update');

});

Route::middleware('auth')
->prefix('auth')
->group(function ()
{

    Route::post('rescope', [SessionController::class, 'rescope'])
        ->middleware(['manager'])
        ->name('rescope.submit');

    Route::post('alter', [SessionController::class, 'alter'])
        ->middleware('admin')
        ->name('alter.submit');

    Route::post('alter/reset', [SessionController::class, 'alterReset'])
        ->middleware('admin')
        ->name('alter.reset.submit');

    Route::post('logout', [SessionController::class, 'logout'])
        ->name('logout.submit');

    Route::get('verify-email', [VerificationController::class,'promptEmailVerification'])
        ->name('verification.prompt');

    Route::post('email/verification-notification', [VerificationController::class, 'sendEmailVerification'])
        ->middleware('throttle:6,1')
        ->name('verification.send');

    Route::get('verify-email/{id}/{hash}', [VerificationController::class,'verifyEmail'])
        ->middleware(['signed', 'throttle:6,1'])
        ->name('verification.verify');

    Route::get('confirm-password', [SecurityController::class, 'requirePasswordPage'])
        ->name('password.confirm.form');

    Route::post('confirm-password', [SecurityController::class, 'requirePassword'])
        ->name('password.confirm.submit');
});
