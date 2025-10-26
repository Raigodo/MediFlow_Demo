<?php

namespace App\Http\Controllers;

use App\Services\CurrentContext;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use App\Services\DataAccess\Facades\Users;

class PasswordController extends Controller
{


    public function editPassowrd()
    {
        return Inertia::render('users/security/change-password');
    }


    public function updatePassword(Request $request)
    {
        $validated = $request->validate([
            'current_password' => ['required', 'current_password'],
            'password' => ['required', Password::defaults(), 'confirmed'],
        ]);

        Users::update(CurrentContext::userId(), [
            'password' => Hash::make($validated['password']),
        ]);

        return back()->with('message', 'Password updated');
    }
    
}
