<?php

namespace App\Services\Actions\Facades;

use App\Services\Actions\AppActionsFactory;
use Illuminate\Support\Facades\Facade;



class AppActions extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return AppActionsFactory::class;
    }
}
