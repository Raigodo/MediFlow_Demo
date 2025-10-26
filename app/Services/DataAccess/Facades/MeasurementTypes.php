<?php

namespace App\Services\DataAccess\Facades;

use App\Services\DataAccess\RepositoryCache\MeasurementTypeRepositoryCache;
use Illuminate\Support\Facades\Facade;



class MeasurementTypes extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return MeasurementTypeRepositoryCache::class;
    }
}
