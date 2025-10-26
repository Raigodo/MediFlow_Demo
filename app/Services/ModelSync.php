<?php

namespace App\Services;

use App\Services\ModelSyncService;
use Illuminate\Support\Facades\Facade;



class ModelSync extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return ModelSyncService::class;
    }
}
