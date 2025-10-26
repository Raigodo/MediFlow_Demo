<?php

namespace App\Services\DataAccess\Facades;

use Illuminate\Support\Facades\Facade;
use App\Services\DataAccess\RepositoryCache\StructureRepositoryCache;



class Structures extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return StructureRepositoryCache::class;
    }
}
