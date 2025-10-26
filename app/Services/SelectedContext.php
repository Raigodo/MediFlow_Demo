<?php

namespace App\Services;

use Illuminate\Support\Facades\Facade;
use App\Services\SelectedContextService;



class SelectedContext extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return SelectedContextService::class;
    }
}
