<?php

namespace App\Services\Actions\Facades;

use App\Services\Actions\TrustedDeviceActionsFactory;
use Illuminate\Support\Facades\Facade;



class TrustedDeviceActions extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return TrustedDeviceActionsFactory::class;
    }
}
