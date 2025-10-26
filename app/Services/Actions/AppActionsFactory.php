<?php

namespace App\Services\Actions;


class AppActionsFactory 
{

    public function home()
    {
        return [
            'can'=> true,
            'method'=> 'GET',
            'url'=> route('home'),
        ];
    }


    public function settings()
    {
        return [
            'can'=> true,
            'method'=> 'GET',
            'url'=> route('settings.index'),
        ];
    }

}
