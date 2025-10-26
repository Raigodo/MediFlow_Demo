<?php

namespace App\Services\Actions;

use App\Enums\ModalKey;
use App\Models\User;
use Illuminate\Support\Facades\Gate;


class UserActionsFactory 
{
    public function index()
    {
        return [
            'can'=> Gate::allows('list', [
                User::class,
            ]),
            'method'=> 'GET',
            'url'=> route('user.index'),
        ];
    }

    
    public function show(User $user)
    {
        return [
            'can'=> Gate::allows('view', [
                User::class,
                $user,
            ]),
            'method'=> 'GET',
            'url'=> route('user.show', [
                'user'=> $user->id,
            ]),
        ];
    }

    
    public function create()
    {
        return [
            'can'=> Gate::allows('create', [
                User::class,
            ]),
            'method'=> 'GET',
            'url'=> '#',
            'metadata'=> [
                'preventRefresh'=> true,
                'modal'=> ModalKey::CREATE_USER,
            ],
        ];
    }

    
    public function store()
    {
        return [
            'can'=> Gate::allows('create', [
                User::class,
            ]),
            'method'=> 'POST',
            'url'=> route('user.store'),
        ];
    }

    
    public function edit(User $user)
    {
        return [
            'can'=> Gate::allows('update', [
                User::class,
                $user,
            ]),
            'method'=> 'GET',
            'url'=> route('user.edit', [
                'user'=> $user->id,
            ]),
        ];
    }

    
    public function update(User $user)
    {
        return [
            'can'=> Gate::allows('update', [
                User::class,
                $user,
            ]),
            'method'=> 'PATCH',
            'url'=> route('user.update', [
                'user'=> $user->id,
            ]),
        ];
    }

    
    public function updateIcon(User $user)
    {
        return [
            'can'=> Gate::allows('update', [
                User::class,
                $user,
            ]),
            'method'=> 'PUT',
            'url'=> route('user.update.icon', [
                'user'=> $user->id,
            ]),
        ];
    }

    
    public function destroy(User $user)
    {
        return [
            'can'=> Gate::allows('delete', [
                User::class,
                $user,
            ]),
            'method'=> 'DELETE',
            'url'=> route('user.destroy', [
                'user'=> $user->id,
            ]),
        ];
    }

    
    public function editPassword(User $user)
    {
        return [
            'can'=> Gate::allows('update', [
                User::class,
                $user,
            ]),
            'method'=> 'GET',
            'url'=> route('user.password.edit', [
                'user'=> $user->id,
            ]),
        ];
    }

    
    public function updatePassword(User $user)
    {
        return [
            'can'=> Gate::allows('update', [
                User::class,
                $user,
            ]),
            'method'=> 'PATCH',
            'url'=> route('user.password.update', [
                'user'=> $user->id,
            ]),
        ];
    }
}