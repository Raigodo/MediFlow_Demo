<?php

namespace App\Enums;

enum UserRole: int
{
    case EMPLOYEE = 100;
    case MANAGER  = 200;
    case ADMIN    = 1000;
}
