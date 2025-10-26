<?php

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;


Route::redirect('/', "auth")
    ->name("index");


Route::get("home", function(){
    return Inertia::render("welcome");
})
    ->middleware("auth")
    ->name('home');

    
require __DIR__.'/ambulance-call.php';
require __DIR__.'/auth.php';
require __DIR__.'/client.php';
require __DIR__.'/diagnose.php';
require __DIR__.'/employee.php';
require __DIR__.'/invitation.php';
require __DIR__.'/measurement.php';
require __DIR__.'/medicament.php';
require __DIR__.'/medication.php';
require __DIR__.'/note.php';
require __DIR__.'/settings.php';
require __DIR__.'/structure.php';
require __DIR__.'/trusted-device.php';
require __DIR__.'/user.php';

