<?php

namespace App\Http\Middleware;

use App\Services\CurrentContext;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Services\DataAccess\Facades\Users;
use Symfony\Component\HttpFoundation\Response;

class HasUserRoleOrHigher
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string|int $role_value): Response
    {
        if (Auth::check() && CurrentContext::userRole() >= $role_value){
            return $next($request);
        }

        return back()->with('message','current user role is not '.$role_value.' or higher');
    }
}
