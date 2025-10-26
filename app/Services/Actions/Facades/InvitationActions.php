<?php

namespace App\Services\Actions\Facades;

use Illuminate\Support\Facades\Facade;
use App\Services\Actions\InvitationActionsFactory;



class InvitationActions extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return InvitationActionsFactory::class;
    }
}
