<?php

namespace App\Http\Controllers\Auth;

use Inertia\Inertia;
use Inertia\Response;
use App\Enums\UserRole;
use App\Services\CurrentContext;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use App\Http\Requests\Auth\JoinRequest;
use Illuminate\Support\Facades\Session;
use App\Http\Requests\Auth\AlterRequest;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RescopeRequest;
use App\Services\DataAccess\Facades\Users;
use App\Http\Requests\Auth\RegisterRequest;
use App\Services\DataAccess\Facades\Employees;
use App\Services\DataAccess\Facades\Structures;

class SessionController extends Controller
{

    /**
     * attempt to alter structure context.
     */
    public function rescope(RescopeRequest $request)
    {
        $request->rescope();
        return to_route('home');
    }

    public function alter(AlterRequest $request)
    {
        $data = $request->validated();
        $user = Users::find($data['user_id']) ?? abort(code: 404);
        $structure_id = CurrentContext::structureId();

        $employee = $user->role->value === UserRole::EMPLOYEE->value
            ? Employees::findByStructure($structure_id, $user->id)
            : null;

        $admin_id = CurrentContext::userRole() >= UserRole::ADMIN->value
            ? CurrentContext::userId()
            : CurrentContext::adminId();

        Auth::loginUsingId($user->id);
        Session::regenerate();

        session([
            'user_id'=> $user->id,
            'user_role'=> $user->role->value,
            'structure_id'=> $structure_id,
            'employee_id'=> $employee?->id,
            'employee_role'=> $employee?->role->value,
            'admin_id'=> $admin_id,
        ]);

        return to_route('home')->with('message', 'Session altered to user '.$user->name.' '.$user->surname);
    }

    

    public function alterReset()
    {
        $user = Users::find(CurrentContext::adminId()) ?? abort(404);

        Auth::loginUsingId($user->id);
        Session::regenerate();

        session([
            'user_id'=> $user->id,
            'user_role'=> $user->role->value,
            'structure_id'=> null,
            'employee_id'=> null,
            'employee_role'=> null,
            'admin_id'=> $user->id,
        ]);

        return to_route('user.index')->with('message', 'Session altered to admin '.$user->name.' '.$user->surname);
    }

    /**
     * Show the login page.
     */
    public function loginPage(): Response
    {
        return Inertia::render('auth/login');
    }

    /**
     * attempt to login user
     */
    public function login(LoginRequest $request): RedirectResponse
    {
        $request->login();
        return to_route('home');
    }

    /**
     * Show the join page.
     */
    public function joinPage(): Response
    {
        return Inertia::render('auth/join');
    }

    /**
     * attempt to join to structure
     */
    public function join(JoinRequest $request): RedirectResponse
    {
        $request->join();
        return to_route('home');
    }

    /**
     * Show the register page.
     */
    public function registerPage()
    {
        return Inertia::render('auth/register');
    }

    /**
     * attempt to register new user
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function register(RegisterRequest $request): RedirectResponse
    {
        $request->register();
        return to_route('home');
    }

    /**
     * logout current user.
     */
    public function logout(): RedirectResponse
    {
        Auth::logout();

        Session::invalidate();
        Session::regenerateToken();

        return to_route('login.form');
    }
}
