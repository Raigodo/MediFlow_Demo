<?php

namespace App\Services\Actions\Facades;

use Illuminate\Support\Facades\Facade;
use App\Services\Actions\MedicationActionsFactory;



class MedicationActions extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return MedicationActionsFactory::class;
    }
}
