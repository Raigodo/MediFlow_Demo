<?php

namespace App\Services\DataAccess\Facades;

use Illuminate\Support\Facades\Facade;
use App\Services\DataAccess\RepositoryCache\ClientRepositoryCache;



class Clients extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return ClientRepositoryCache::class;
    }
}
