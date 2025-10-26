<?php

namespace App\Services\DataAccess\Facades;

use Illuminate\Support\Facades\Facade;
use App\Services\DataAccess\RepositoryCache\DiagnoseRepositoryCache;



class Diagnoses extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return DiagnoseRepositoryCache::class;
    }
}
