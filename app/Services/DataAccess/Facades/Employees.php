<?php

namespace App\Services\DataAccess\Facades;

use Illuminate\Support\Facades\Facade;
use App\Services\DataAccess\RepositoryCache\EmployeeRepositoryCache;


class Employees extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return EmployeeRepositoryCache::class;
    }
}
