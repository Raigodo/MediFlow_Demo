<?php

namespace App\Enums;

enum InvalidityGroup: int
{
    case NONE   = 0;
    case FIRST  = 1;
    case SECOND = 2;
    case THIRD  = 3;
}
