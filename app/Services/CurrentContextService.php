<?php

namespace App\Services;

use Illuminate\Support\Facades\Session;
use App\Services\DataAccess\Facades\Users;
use App\Services\DataAccess\Facades\Employees;
use App\Services\DataAccess\Facades\Structures;

class CurrentContextService 
{

    public function user()
    {
        $user_id = CurrentContext::userId();
        return $user_id ? Users::findDetail($user_id) : null;
    }

    public function userId()
    {
        return Session::get('user_id');
    }

    public function userRole()
    {
        return Session::get('user_role');
    }


    public function structure()
    {
        $structure_id = CurrentContext::structureId();
        return $structure_id ? Structures::findDetail($structure_id) : null;
    }

    public function structureId()
    {
        return Session::get('structure_id');
    }

    public function employee()
    {
        $employee_id = CurrentContext::employeeId();
        return $employee_id ? Employees::findDetail($employee_id) : null;
    }

    public function employeeId()
    {
        return Session::get('employee_id');
    }
    
    public function employeeRole()
    {
        return Session::get('employee_role');
    }
    
    public function adminId()
    {
        return Session::get('admin_id');
    }
}
