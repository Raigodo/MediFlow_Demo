<?php

namespace App\Services\DataAccess\Facades;

use Illuminate\Support\Facades\Facade;
use App\Services\DataAccess\RepositoryCache\MedicamentManagerRepositoryCache;



class MedicamentManagers extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return MedicamentManagerRepositoryCache::class;
    }
}
