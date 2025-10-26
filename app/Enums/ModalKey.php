<?php

namespace App\Enums;

enum ModalKey: string
{
    case CREATE_USER = 'create-user';
    case CREATE_CLIENT = 'create-client';
    case CREATE_STRUCTURE = 'create-structure';
    case CREATE_INVITATION = 'create-invitation';
    case CREATE_DIAGNOSE = 'create-diagnose';
    case CREATE_AMBULANCE_CALL = 'create-ambulance-call';
    case CREATE_MEASUREMENT = 'create-measurement';
    case CREATE_MEDICATION = 'create-medication';
}


