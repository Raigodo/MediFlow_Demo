<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Services\CurrentContext;
use Illuminate\Support\Facades\Auth;
use App\Services\DataAccess\Facades\Users;
use Symfony\Component\HttpFoundation\Response;

class HasExactUserRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string|int $role_value): Response
    {
        if (Auth::check() && CurrentContext::userRole() == $role_value){
            return $next($request);
        }

        return back()->with('message','current user role is not '.$role_value);
    }
}
