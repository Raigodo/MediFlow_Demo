<?php

namespace App\Services\DataAccess\Facades;

use App\Services\DataAccess\RepositoryCache\MedicamentTypeRepositoryCache;
use Illuminate\Support\Facades\Facade;


class MedicamentTypes extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return MedicamentTypeRepositoryCache::class;
    }
}
