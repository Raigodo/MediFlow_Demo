import CreateAmbulanceCallModal from '@/components/ambulance-call/modal/create-ambulance-call-modal';
import EditAmbulanceCallModal from '@/components/ambulance-call/modal/edit-ambulance-call-modal';
import FilterAmbulanceCallModal from '@/components/ambulance-call/modal/filter-ambulance-call-modal';
import PreviewAmbulanceCallModal from '@/components/ambulance-call/modal/preview-ambulance-call-modal';
import CreateClientModal from '@/components/client/modal/create-client-modal';
import FilterClientModal from '@/components/client/modal/filter-client-modal';
import PreviewClientModal from '@/components/client/modal/preview-client-modal';
import SetClientIconModal from '@/components/client/modal/set-client-icon-modal';
import CreateDiagnoseModal from '@/components/diagnose/modal/create-diagnose-modal';
import EditDiagnoseModal from '@/components/diagnose/modal/edit-diagnose-modal';
import FilterDiagnoseModal from '@/components/diagnose/modal/filter-diagnose-modal';
import PreviewDiagnoseModal from '@/components/diagnose/modal/preview-diagnose-modal';
import FilterEmployeeModal from '@/components/employee/modal/filter-employee-modal';
import PreviewEmployeeModal from '@/components/employee/modal/preview-employee-modal';
import CreateInvitationModal from '@/components/invitation/modal/create-invitation-modal';
import FilterInvitationModal from '@/components/invitation/modal/filter-invitation-modal';
import PreviewInvitationModal from '@/components/invitation/modal/preview-invitation-modal';
import CreateMeasurementModal from '@/components/measurement/modal/create-measurement-modal';
import EditMeasurementModal from '@/components/measurement/modal/edit-measurement-modal';
import FilterMeasurementModal from '@/components/measurement/modal/filter-measurement-modal';
import PreviewMeasurementModal from '@/components/measurement/modal/preview-medication-modal';
import FilterMedicamentModal from '@/components/medicament/modal/filter-medicament-modal';
import PreviewMedicamentModal from '@/components/medicament/modal/preview-medicament-modal';
import CreateMedicationModal from '@/components/medication/modal/create-medication-modal';
import EditMedicationModal from '@/components/medication/modal/edit-medication-modal';
import FilterMedicationModal from '@/components/medication/modal/filter-medication-modal';
import PreviewMedicationModal from '@/components/medication/modal/preview-medication-modal';
import FilterNoteModal from '@/components/note/modal/filter-note-modal';
import PreviewNoteModal from '@/components/note/modal/preview-note-modal';
import CreateStructureModal from '@/components/structure/modal/create-structure-modal';
import FilterStructureModal from '@/components/structure/modal/filter-structure-modal';
import PreviewStructureModal from '@/components/structure/modal/preview-structure-modal';
import SetStructureIconModal from '@/components/structure/modal/set-structure-icon-modal';
import FilterTrustedDeviceModal from '@/components/trusted-device/modal/filter-trusted-device-modal';
import PreviewTrustedDeviceModal from '@/components/trusted-device/modal/preview-trusted-device-modal';
import CreateUserModal from '@/components/user/modal/create-user-modal';
import FilterUserModal from '@/components/user/modal/filter-user-modal';
import PreviewUserModal from '@/components/user/modal/preview-user-modal';
import SetProfileIconModal from '@/components/user/modal/set-profile-icon-modal';
import { ReactNode } from 'react';

function ModalLayout({ children }: { children: ReactNode }) {
    return (
        <>
            {children}

            <FilterAmbulanceCallModal />
            <FilterClientModal />
            <FilterTrustedDeviceModal />
            <FilterDiagnoseModal />
            <FilterEmployeeModal />
            <FilterInvitationModal />
            <FilterMeasurementModal />
            <FilterMedicamentModal />
            <FilterNoteModal />
            <FilterMedicationModal />
            <FilterStructureModal />
            <FilterUserModal />

            <PreviewNoteModal />
            <PreviewStructureModal />
            <PreviewUserModal />
            <PreviewTrustedDeviceModal />
            <PreviewEmployeeModal />
            <PreviewClientModal />
            <PreviewMedicamentModal />
            <PreviewInvitationModal />
            <PreviewDiagnoseModal />
            <PreviewAmbulanceCallModal />
            <PreviewMeasurementModal />
            <PreviewMedicationModal />

            <CreateUserModal />
            <CreateClientModal />
            <CreateStructureModal />
            <CreateInvitationModal />
            <CreateDiagnoseModal />
            <CreateAmbulanceCallModal />
            <CreateMeasurementModal />
            <CreateMedicationModal />

            <EditDiagnoseModal />
            <EditAmbulanceCallModal />
            <EditMeasurementModal />
            <EditMedicationModal />

            <SetClientIconModal />
            <SetProfileIconModal />
            <SetStructureIconModal />
        </>
    );
}

export default ModalLayout;
