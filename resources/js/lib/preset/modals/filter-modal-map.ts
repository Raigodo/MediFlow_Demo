import { FilterAmbulanceCallModalComponentProps } from '@/components/ambulance-call/modal/filter-ambulance-call-modal';
import { FilterClientModalComponentProps } from '@/components/client/modal/filter-client-modal';
import { FilterDiagnoseModalComponentProps } from '@/components/diagnose/modal/filter-diagnose-modal';
import { FilterEmployeeModalComponentProps } from '@/components/employee/modal/filter-employee-modal';
import { InvitationFilterModalComponentProps } from '@/components/invitation/modal/filter-invitation-modal';
import { FilterMeasurementModalComponentProps } from '@/components/measurement/modal/filter-measurement-modal';
import { FilterMedicamentModalComponentProps } from '@/components/medicament/modal/filter-medicament-modal';
import { FilterMedicationModalComponentProps } from '@/components/medication/modal/filter-medication-modal';
import { FilterNoteModalComponentProps } from '@/components/note/modal/filter-note-modal';
import { FilterStructureModalComponentProps } from '@/components/structure/modal/filter-structure-modal';
import { FilterTrustedDeviceModalComponentProps } from '@/components/trusted-device/modal/filter-trusted-device-modal';
import { FilterUserModalComponentProps } from '@/components/user/modal/filter-user-modal';
import { FilterModalKey } from '@/lib/types/values/modal-key';

export type FilterModalMap = {
    [FilterModalKey.AMBULANCE_CALL_FILTER]: FilterAmbulanceCallModalComponentProps;
    [FilterModalKey.CLIENT_FILTER]: FilterClientModalComponentProps;
    [FilterModalKey.TRUSTED_DEVICE_FILTER]: FilterTrustedDeviceModalComponentProps;
    [FilterModalKey.DIAGNOSE_FILTER]: FilterDiagnoseModalComponentProps;
    [FilterModalKey.EMPLOYEE_FILTER]: FilterEmployeeModalComponentProps;
    [FilterModalKey.INVITATION_FILTER]: InvitationFilterModalComponentProps;
    [FilterModalKey.MEASUREMENT_FILTER]: FilterMeasurementModalComponentProps;
    [FilterModalKey.MEDICAMENT_FILTER]: FilterMedicamentModalComponentProps;
    [FilterModalKey.NOTE_FILTER]: FilterNoteModalComponentProps;
    [FilterModalKey.MEDICATION_FILTER]: FilterMedicationModalComponentProps;
    [FilterModalKey.STRUCTURES_FILTER]: FilterStructureModalComponentProps;
    [FilterModalKey.USER_FILTER]: FilterUserModalComponentProps;
};
