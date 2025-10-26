<?php

namespace App\Services\DataAccess\Facades;

use Illuminate\Support\Facades\Facade;
use App\Services\DataAccess\RepositoryCache\TrustedDeviceRepositoryCache;



class TrustedDevices extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return TrustedDeviceRepositoryCache::class;
    }
}
