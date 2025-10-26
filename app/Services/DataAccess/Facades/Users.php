<?php

namespace App\Services\DataAccess\Facades;

use Illuminate\Support\Facades\Facade;
use App\Services\DataAccess\RepositoryCache\UserRepositoryCache;


class Users extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return UserRepositoryCache::class;
    }
}
