<?php

namespace App\Services\Actions\Facades;

use Illuminate\Support\Facades\Facade;
use App\Services\Actions\SessionActionsFactory;



class SessionActions extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return SessionActionsFactory::class;
    }
}
