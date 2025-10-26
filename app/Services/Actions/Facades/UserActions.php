<?php

namespace App\Services\Actions\Facades;

use Illuminate\Support\Facades\Facade;
use App\Services\Actions\UserActionsFactory;



class UserActions extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return UserActionsFactory::class;
    }
}
