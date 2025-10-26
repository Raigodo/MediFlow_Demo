import { CreateAmbulanceCallModalComponentProps } from '@/components/ambulance-call/modal/create-ambulance-call-modal';
import { CreateClientModalComponentProps } from '@/components/client/modal/create-client-modal';
import { CreateDiagnoseModalComponentProps } from '@/components/diagnose/modal/create-diagnose-modal';
import { CreateInvitationModalComponentProps } from '@/components/invitation/modal/create-invitation-modal';
import { CreateMeasurementModalComponentProps } from '@/components/measurement/modal/create-measurement-modal';
import { CreateMedicationModalComponentProps } from '@/components/medication/modal/create-medication-modal';
import { CreateStructureModalComponentProps } from '@/components/structure/modal/create-structure-modal';
import { CreateUserModalComponentProps } from '@/components/user/modal/create-user-modal';
import { CreateModalKey } from '@/lib/types/values/modal-key';

export type CreateModalMap = {
    [CreateModalKey.CREATE_STRUCTURE]: CreateStructureModalComponentProps;
    [CreateModalKey.CREATE_CLIENT]: CreateClientModalComponentProps;
    [CreateModalKey.CREATE_USER]: CreateUserModalComponentProps;
    [CreateModalKey.CREATE_INVITATION]: CreateInvitationModalComponentProps;

    [CreateModalKey.CREATE_AMBULANCE_CALL]: CreateAmbulanceCallModalComponentProps;
    [CreateModalKey.CREATE_DIAGNOSE]: CreateDiagnoseModalComponentProps;
    [CreateModalKey.CREATE_MEASUREMENT]: CreateMeasurementModalComponentProps;
    [CreateModalKey.CREATE_MEDICATION]: CreateMedicationModalComponentProps;
};
