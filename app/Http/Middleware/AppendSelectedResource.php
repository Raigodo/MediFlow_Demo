<?php

namespace App\Http\Middleware;

use App\Services\SelectedContext;
use Closure;
use Illuminate\Http\Request;

class AppendSelectedResource
{
    public function handle(
        Request $request, 
        Closure $next, 
        $repository_class,
        $resource_class,
        string $name, 
        string|null $super_name = null, 
    ) {
        $super_id = $super_name
            ? $request->route($super_name)
            : null;
        $id = $request->route($name);

        $repository = app($repository_class);
        $model = $super_id
            ? $repository::findDetail($super_id, $id) ?? abort(404)
            : $repository::findDetail($id) ?? abort(404);

        SelectedContext::setSelectedModel($name, $model, $resource_class);
            
        return $next($request);
    }
}

