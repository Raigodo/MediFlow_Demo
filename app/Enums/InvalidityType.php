<?php

namespace App\Enums;

enum InvalidityType: int
{
    case NONE      = 0;
    case TEMPORARY = 1;
    case PERMANENT = 2;
}
