<?php

namespace App\Services;

use App\Services\CurrentContextService;
use Illuminate\Support\Facades\Facade;



class CurrentContext extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return CurrentContextService::class;
    }
}
