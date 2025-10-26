<?php

namespace App\Enums;

enum EmployeeRole: int
{
    case NURSE         = 300;
    case CAREGIVER     = 200;
    case REHABILITATOR = 100;
}
