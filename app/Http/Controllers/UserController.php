<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\StoreUserRequest;
use App\Services\DataAccess\Repositories\UserRepository;
use Inertia\Inertia;
use App\Enums\UserRole;
use Illuminate\Http\Request;
use App\Services\CurrentContext;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;
use App\Services\DataAccess\Facades\Users;
use App\Http\Requests\User\SetUserAvatarRequest;
use App\Http\Requests\User\UpdateProfileRequest;
use App\Http\Resources\User\UserPreviewPagination;

class UserController extends Controller
{

    public function managers(Request $request)
    {
        $filter = [
            'created_from'=> $request->query('created_from'),
            'created_to'=> $request->query('created_to'),
            'archived'=> $request->query('archived'),
            'archived_from'=> $request->query('archived_from'),
            'archived_to'=> $request->query('archived_to'),
            'verified'=> $request->query('verified'),
            'role'=> UserRole::MANAGER->value,
            'page'=> $request->query('page'),
        ];

        $managers = Users::paginated($filter);
        
        return Inertia::render('users/index', [
            'collections.paginated'=> [
                'users'=> new UserPreviewPagination($managers, $filter),
            ]
        ]);
    }


    public function show($user_id)
    {
        return Inertia::render("users/show");
    }


    public function edit($user_id)
    {
        return Inertia::render('users/edit');
    }


    public function update(UpdateProfileRequest $request, $user_id)
    {
        $data = $request->validated();
        Users::update($user_id, $data);
        return to_route('user.show', $user_id)->with('message', 'User updated');
    }


    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();
        Users::create($data);
        return back();
    }


    public function setIcon(SetUserAvatarRequest $request)
    {
        $user_id = CurrentContext::userId();
        $user = $user_id ? Users::find($user_id) : null;
        $file = $request->file('image');
        $extension = $file->getClientOriginalExtension();
        $name = uniqid() . '.' . $extension;

        $success = Storage::putFileAs(
            'users/icons/',
            $file,
            $name,
        );

        throw_if(!$success);

        if ($user->icon_key !== 'default.jpg'){
            $deleted = Storage::delete('users/icons/' . $user->icon_key);
            throw_if(!$deleted);
        }
        $user->icon_key = $name;
        $user->save();

        Users::invalidateAll();

        return back()->with('message', 'User icon updated');
    }


    public function destroy($user_id)
    {
        $user_id = CurrentContext::userId();
        $current_user = $user_id ? Users::find($user_id) : null;
        
        $same_user = $current_user->id === $user_id;
        $is_admin = $current_user->role === UserRole::ADMIN;

        if (!$same_user && !$is_admin) {
            return back()->with('message','current user can not delete user with id '.$user_id);
        }

        if ($same_user){
            Auth::logout();
        }

        Users::delete($user_id);

        if (CurrentContext::userId() === $user_id) {
            Session::invalidate();
            Session::regenerateToken();
        }

        if (CurrentContext::userRole() >= UserRole::ADMIN) {
            return to_route('user.index')->with('message', 'User deleted');
        }

        return redirect('/')->with('message', 'User deleted');
    }
}
