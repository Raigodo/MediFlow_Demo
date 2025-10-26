import { EditAmbulanceCallModalComponentProps } from '@/components/ambulance-call/modal/edit-ambulance-call-modal';
import { EditDiagnoseModalComponentProps } from '@/components/diagnose/modal/edit-diagnose-modal';
import { EditMeasurementModalComponentProps } from '@/components/measurement/modal/edit-measurement-modal';
import { EditMedicationModalComponentProps } from '@/components/medication/modal/edit-medication-modal';
import { EditModalKey } from '@/lib/types/values/modal-key';

export type EditModalMap = {
    [EditModalKey.EDIT_AMBULANCE_CALL]: EditAmbulanceCallModalComponentProps;
    [EditModalKey.EDIT_DIAGNOSE]: EditDiagnoseModalComponentProps;
    [EditModalKey.EDIT_MEASUREMENT]: EditMeasurementModalComponentProps;
    [EditModalKey.EDIT_MEDICATION]: EditMedicationModalComponentProps;
};
