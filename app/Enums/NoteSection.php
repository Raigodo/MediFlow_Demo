<?php

namespace App\Enums;

enum NoteSection: string
{
    case AMBULANCE_CALLS = 'ambulance-calls';
    case DIAGNOSES = 'diagnoses';
    case MEASUREMENTS = 'measurements';
    case MEDICATIONS = 'medications';

}


