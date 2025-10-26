<?php

namespace App\Services\DataAccess\Facades;

use Illuminate\Support\Facades\Facade;
use App\Services\DataAccess\RepositoryCache\MeasurementRepositoryCache;



class Measurements extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return MeasurementRepositoryCache::class;
    }
}
