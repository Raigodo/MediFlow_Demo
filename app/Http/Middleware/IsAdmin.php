<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Symfony\Component\HttpFoundation\Response;

class IsAdmin
{

    public function handle(Request $request, Closure $next): Response
    {
        if (Gate::authorize('admin'))
        {
            return $next($request);
        }

        return back()->with('message','current user role is not admin');
    }
}
