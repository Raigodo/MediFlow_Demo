<?php

namespace App\Http\Resources\Session;

use Illuminate\Http\Request;
use App\Services\CurrentContext;
use App\Services\Actions\Facades\AppActions;
use App\Services\Actions\Facades\UserActions;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Services\Actions\Facades\SessionActions;

class SessionActionsResource extends JsonResource
{

    public function __construct() {
        parent::__construct([]);
    }

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $user = CurrentContext::user();

        return [
            'dropdown'=> [
                'profile'=> $user 
                    ? UserActions::show($user)
                    : null,
                'settings'=> AppActions::settings(),
                'logout'=> SessionActions::logout(),
            ],
            'profile'=> $user && UserActions::show($user),
            'settings'=> AppActions::settings(),
            'loginPage'=> SessionActions::loginPage(),
            'login'=> SessionActions::login(),
            'joinPage'=> SessionActions::joinPage(),
            'join'=> SessionActions::join(),
            'registerPage'=> SessionActions::registerPage(),
            'register'=> SessionActions::register(),
            'logout'=> SessionActions::logout(),
            'forgotPasswordPage'=> SessionActions::forgotPassowrdPage(),
            'forgotPassword'=> SessionActions::forgotPassowrd(),
            'resetPassword'=> SessionActions::resetPassword(),

            'home'=> AppActions::home(),
        ];
    }
}
