<?php

namespace App\Services\Actions\Facades;

use App\Services\Actions\EmployeeActionsFactory;
use Illuminate\Support\Facades\Facade;



class EmployeeActions extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return EmployeeActionsFactory::class;
    }
}
