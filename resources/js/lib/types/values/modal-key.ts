enum FilterModalKey {
    AMBULANCE_CALL_FILTER = 'ambulance-call-filter',
    CLIENT_FILTER = 'client-filter',
    TRUSTED_DEVICE_FILTER = 'trusted-device-filter',
    DIAGNOSE_FILTER = 'diagnose-filter',
    EMPLOYEE_FILTER = 'employee-filter',
    INVITATION_FILTER = 'invitation-filter',
    MEASUREMENT_FILTER = 'measurement-filter',
    MEDICAMENT_FILTER = 'medicament-filter',
    MEDICATION_FILTER = 'medication-filter',
    NOTE_FILTER = 'note-filter',
    STRUCTURES_FILTER = 'structures-filter',
    USER_FILTER = 'user-filter',
}

enum PreviewModalKey {
    PREVIEW_NOTE = 'preview-note',
    PREVIEW_USER = 'peview-user',
    PREVIEW_STRUCTURE = 'peview-structure',
    PREVIEW_DEVICE = 'peview-device',
    PREVIEW_EMPLOYEE = 'peview-employee',
    PREVIEW_CLIENT = 'peview-client',
    PREVIEW_MEDICAMENT = 'peview-medicament',
    PREVIEW_INVITATION = 'peview-invitation',
    PREVIEW_DIAGNOSE = 'peview-diagnose',
    PREVIEW_AMBULANCE_CALL = 'peview-ambulance-call',
    PREVIEW_MEASUREMENT = 'peview-measurement',
    PREVIEW_MEDICATION = 'peview-medication',
}

enum CreateModalKey {
    CREATE_USER = 'create-user',
    CREATE_CLIENT = 'create-client',
    CREATE_STRUCTURE = 'create-structure',
    CREATE_INVITATION = 'create-invitation',

    CREATE_DIAGNOSE = 'create-diagnose',
    CREATE_AMBULANCE_CALL = 'create-ambulance-call',
    CREATE_MEASUREMENT = 'create-measurement',
    CREATE_MEDICATION = 'create-medication',
}

enum EditModalKey {
    EDIT_DIAGNOSE = 'edit-diagnose',
    EDIT_AMBULANCE_CALL = 'edit-ambulance-call',
    EDIT_MEASUREMENT = 'edit-measurement',
    EDIT_MEDICATION = 'edit-medication',
}

enum SetIconModalKey {
    SET_CLIENT_ICON = 'set-client-icon',
    SET_PROFILE_ICON = 'set-profile-icon',
    SET_STRUCTURE_ICON = 'set-structure-icon',
}

const ModalKey = {
    ...FilterModalKey,
    ...PreviewModalKey,
    ...CreateModalKey,
    ...EditModalKey,
    ...SetIconModalKey,
} as const;

type ModalKey = typeof ModalKey;

export { CreateModalKey, EditModalKey, FilterModalKey, ModalKey, PreviewModalKey, SetIconModalKey };
