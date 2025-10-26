<?php

namespace App\Services\Actions\Facades;

use Illuminate\Support\Facades\Facade;
use App\Services\Actions\MeasurementActionsFactory;



class MeasurementActions extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return MeasurementActionsFactory::class;
    }
}
