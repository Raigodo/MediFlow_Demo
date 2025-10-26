<?php

namespace App\Services\Actions\Facades;

use App\Services\Actions\DiagnoseActionsFactory;
use Illuminate\Support\Facades\Facade;



class DiagnoseActions extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return DiagnoseActionsFactory::class;
    }
}
