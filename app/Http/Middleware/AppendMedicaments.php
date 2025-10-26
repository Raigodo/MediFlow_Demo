<?php

namespace App\Http\Middleware;

use App\Services\DataAccess\Facades\Medicaments;
use Closure;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Services\CurrentContext;
use App\Services\DataAccess\Facades\Clients;

class AppendMedicaments
{
    public function handle(
        Request $request, 
        Closure $next,
    ) {
        $structure_id = CurrentContext::structureId();
        $clients = Medicaments::all();

        Inertia::share('collections.medicaments', function () use ($clients) {
                return $clients->toArray();
            });
            
        return $next($request);
    }
}

