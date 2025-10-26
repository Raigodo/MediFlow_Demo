<?php

namespace App\Enums;

enum FilterNoteFlag: string
{
    case ALL = 'all';
    case NOT_IMPORTANT = 'not_important';
    case IMPORTANT = 'important';

}
