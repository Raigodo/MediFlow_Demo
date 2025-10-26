<?php

namespace App\Services\DataAccess\Facades;

use App\Services\DataAccess\RepositoryCache\AmbulanceCallRepositoryCache;
use Illuminate\Support\Facades\Facade;



class AmbulanceCalls extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return AmbulanceCallRepositoryCache::class;
    }
}
