<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Services\RecursiveCaseConverter;
use Symfony\Component\HttpFoundation\Response;

class TransformRequestCasing
{
    public function handle(Request $request, Closure $next): Response
    {
        $convertedRequest = resolve(RecursiveCaseConverter::class)
            ->convert(RecursiveCaseConverter::CASE_SNAKE, $request->all());
        $request->replace($convertedRequest);

        $response = $next($request);

        if (
            $response instanceof JsonResponse ||
            $response->headers->get('Content-Type') === 'application/json'
        ) {
            $original = json_decode($response->content(), true);
            $converted = resolve(RecursiveCaseConverter::class)
                ->convert(RecursiveCaseConverter::CASE_CAMEL, $original);
            $response->setData($converted);
        }

        return $response;
    }
}
