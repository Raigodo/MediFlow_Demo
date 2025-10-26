<?php

namespace App\Services\Actions\Facades;

use App\Services\Actions\AmbulanceCallActionsFactory;
use Illuminate\Support\Facades\Facade;



class AmbulanceCallActions extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return AmbulanceCallActionsFactory::class;
    }
}
