<?php

namespace App\Services\DataAccess\Facades;

use Illuminate\Support\Facades\Facade;
use App\Services\DataAccess\RepositoryCache\MedicationRepositoryCache;



class Medications extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return MedicationRepositoryCache::class;
    }
}
