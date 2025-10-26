import ResourceModalComponent from '@/components/_shared/modal/variant/write/resource-modal-component';
import { MedicationTemp } from '@/lib/types/models/medication/medication-temp';
import { ModalKey } from '@/lib/types/values/modal-key';
import ModalWrapper, { BaseModalComponentProps } from '../../_shared/modal/modal-wrapper';
import EditMedicationForm from '../form/edit-medication-form';

const EditMedicationModal = () => {
    return <ModalWrapper modalKey={ModalKey.EDIT_MEDICATION} modalComponent={ModalComponent} />;
};

export default EditMedicationModal;

export interface EditMedicationModalComponentProps extends BaseModalComponentProps {
    medication: MedicationTemp;
    onSubmit: (tempModel: MedicationTemp) => void;
    onDelete: (tempModel: MedicationTemp) => void;
}

const ModalComponent = ({
    isOpen,
    closeModal,
    medication,
    onSubmit,
    onDelete,
}: EditMedicationModalComponentProps) => {
    if (!medication || !onSubmit || !onDelete) {
        console.error('can not open modal because of invalid state');
        closeModal();
        return;
    }

    return (
        <ResourceModalComponent
            isOpen={isOpen}
            closeModal={closeModal}
            title="Medication"
            description="Jauns medication"
        >
            <EditMedicationForm
                onSuccess={closeModal}
                medication={medication}
                onSubmit={onSubmit}
                onDelete={onDelete}
            />
        </ResourceModalComponent>
    );
};
