import { PreviewAmbulanceCallModalComponentProps } from '@/components/ambulance-call/modal/preview-ambulance-call-modal';
import { PreviewClientModalComponentProps } from '@/components/client/modal/preview-client-modal';
import { PreviewDiagnoseModalComponentProps } from '@/components/diagnose/modal/preview-diagnose-modal';
import { PreviewEmployeeModalComponentProps } from '@/components/employee/modal/preview-employee-modal';
import { PreviewInvitationModalComponentProps } from '@/components/invitation/modal/preview-invitation-modal';
import { PreviewMeasurementModalComponentProps } from '@/components/measurement/modal/preview-medication-modal';
import { PreviewMedicamentModalComponentProps } from '@/components/medicament/modal/preview-medicament-modal';
import { PreviewMedicationModalComponentProps } from '@/components/medication/modal/preview-medication-modal';
import { PreviewNoteModalComponentProps } from '@/components/note/modal/preview-note-modal';
import { PreviewStructureModalComponentProps } from '@/components/structure/modal/preview-structure-modal';
import { PreviewTrustedDeviceModalComponentProps } from '@/components/trusted-device/modal/preview-trusted-device-modal';
import { PreviewUserModalComponentProps } from '@/components/user/modal/preview-user-modal';
import { PreviewModalKey } from '@/lib/types/values/modal-key';

export type PreviewModalMap = {
    [PreviewModalKey.PREVIEW_NOTE]: PreviewNoteModalComponentProps;
    [PreviewModalKey.PREVIEW_DEVICE]: PreviewTrustedDeviceModalComponentProps;
    [PreviewModalKey.PREVIEW_STRUCTURE]: PreviewStructureModalComponentProps;
    [PreviewModalKey.PREVIEW_USER]: PreviewUserModalComponentProps;
    [PreviewModalKey.PREVIEW_DEVICE]: PreviewTrustedDeviceModalComponentProps;
    [PreviewModalKey.PREVIEW_EMPLOYEE]: PreviewEmployeeModalComponentProps;
    [PreviewModalKey.PREVIEW_CLIENT]: PreviewClientModalComponentProps;
    [PreviewModalKey.PREVIEW_MEDICAMENT]: PreviewMedicamentModalComponentProps;
    [PreviewModalKey.PREVIEW_INVITATION]: PreviewInvitationModalComponentProps;
    [PreviewModalKey.PREVIEW_DIAGNOSE]: PreviewDiagnoseModalComponentProps;
    [PreviewModalKey.PREVIEW_AMBULANCE_CALL]: PreviewAmbulanceCallModalComponentProps;
    [PreviewModalKey.PREVIEW_MEASUREMENT]: PreviewMeasurementModalComponentProps;
    [PreviewModalKey.PREVIEW_MEDICATION]: PreviewMedicationModalComponentProps;
};
