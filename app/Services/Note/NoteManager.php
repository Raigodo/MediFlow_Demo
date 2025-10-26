<?php

namespace App\Services\Note;

use Illuminate\Support\Facades\Facade;



class NoteManager extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return NoteManagerService::class;
    }
}
