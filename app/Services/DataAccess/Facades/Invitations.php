<?php

namespace App\Services\DataAccess\Facades;

use Illuminate\Support\Facades\Facade;
use App\Services\DataAccess\RepositoryCache\InvitationRepositoryCache;



class Invitations extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return InvitationRepositoryCache::class;
    }
}
