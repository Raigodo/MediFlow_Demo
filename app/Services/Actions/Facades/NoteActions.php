<?php

namespace App\Services\Actions\Facades;

use Illuminate\Support\Facades\Facade;
use App\Services\Actions\NoteActionsFactory;



class NoteActions extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return NoteActionsFactory::class;
    }
}
