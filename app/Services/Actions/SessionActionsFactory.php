<?php

namespace App\Services\Actions;

use App\Enums\UserRole;
use App\Models\User;
use App\Models\Structure;
use App\Services\CurrentContext;
use Illuminate\Support\Facades\Auth;


class SessionActionsFactory 
{
    public function index()
    {
        return [
            'can'=> !Auth::check(),
            'method'=> 'GET',
            'url'=> route('auth.index'),
        ];
    }
    

    public function loginPage()
    {
        return [
            'can'=> !Auth::check(),
            'method'=> 'GET',
            'url'=> route('login.form'),
        ];
    }
    

    public function login()
    {
        return [
            'can'=> !Auth::check(),
            'method'=> 'POST',
            'url'=> route('login.submit'),
        ];
    }
    

    public function joinPage()
    {
        return [
            'can'=> !Auth::check(),
            'method'=> 'GET',
            'url'=> route('join.form'),
        ];
    }
    

    public function join()
    {
        return [
            'can'=> !Auth::check(),
            'method'=> 'POST',
            'url'=> route('join.submit'),
        ];
    }
    

    public function registerPage()
    {
        return [
            'can'=> !Auth::check(),
            'method'=> 'GET',
            'url'=> route('register.form'),
        ];
    }
    

    public function register()
    {
        return [
            'can'=> !Auth::check(),
            'method'=> 'POST',
            'url'=> route('register.submit'),
        ];
    }
    

    public function forgotPassowrdPage()
    {
        return [
            'can'=> !Auth::check(),
            'method'=> 'GET',
            'url'=> route('password.request'),
        ];
    }
    

    public function forgotPassowrd()
    {
        return [
            'can'=> !Auth::check(),
            'method'=> 'POST',
            'url'=> route('password.email'),
        ];
    }
    

    public function resetPassword()
    {
        return [
            'can'=> !Auth::check(),
            'method'=> 'POST',
            'url'=> route('password.update'),
        ];
    }
    

    public function rescope(Structure $structure)
    {
        return [
            'can'=> Auth::check() && CurrentContext::userRole() >= UserRole::MANAGER->value,
            'method'=> 'POST',
            'url'=> route('rescope.submit'),
            'body'=> [
                'structureId'=> $structure->id,
            ],
        ];
    }
    

    public function alter(User $user)
    {
        return [
            'can'=> Auth::check() && CurrentContext::adminId() === CurrentContext::userId(),
            'method'=> 'POST',
            'url'=> route('alter.submit'),
            'body'=> [
                'userId'=> $user->id,
            ],
        ];
    }
    

    public function alterReset()
    {
        return [
            'can'=> Auth::check() && CurrentContext::adminId() !== CurrentContext::userId(),
            'method'=> 'POST',
            'url'=> route('alter.reset.submit'),
        ];
    }
    

    public function logout()
    {
        return [
            'can'=> Auth::check(),
            'method'=> 'POST',
            'url'=> route('logout.submit'),
        ];
    }
    

    public function veriffyEmailPrompt()
    {
        return [
            'can'=> Auth::check(),
            'method'=> 'GET',
            'url'=> route('verification.prompt'),
        ];
    }
    

    public function veriffyEmailSend()
    {
        return [
            'can'=> Auth::check(),
            'method'=> 'POST',
            'url'=> route('verification.send'),
        ];
    }
    

    public function veriffyEmail()
    {
        return [
            'can'=> Auth::check(),
            'method'=> 'GET',
            'url'=> route('verification.verify'),
        ];
    }
    

    public function confirmPasswordPage()
    {
        return [
            'can'=> Auth::check(),
            'method'=> 'GET',
            'url'=> route('password.confirm.form'),
        ];
    }
    

    public function confirmPassword()
    {
        return [
            'can'=> Auth::check(),
            'method'=> 'POST',
            'url'=> route('password.confirm.submit'),
        ];
    }
}