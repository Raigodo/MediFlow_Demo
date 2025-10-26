<?php

namespace App\Services\Actions\Facades;

use App\Services\Actions\ClientActionsFactory;
use Illuminate\Support\Facades\Facade;



class ClientActions extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return ClientActionsFactory::class;
    }
}
