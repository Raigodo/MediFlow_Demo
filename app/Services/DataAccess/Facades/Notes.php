<?php

namespace App\Services\DataAccess\Facades;

use Illuminate\Support\Facades\Facade;
use App\Services\DataAccess\RepositoryCache\NoteRepositoryCache;



class Notes extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return NoteRepositoryCache::class;
    }
}
