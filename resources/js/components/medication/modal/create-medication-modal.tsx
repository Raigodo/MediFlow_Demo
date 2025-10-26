import ResourceModalComponent from '@/components/_shared/modal/variant/write/resource-modal-component';
import { MedicationTemp } from '@/lib/types/models/medication/medication-temp';
import { ModalKey } from '@/lib/types/values/modal-key';
import ModalWrapper, { BaseModalComponentProps } from '../../_shared/modal/modal-wrapper';
import CreateMedicationForm from '../form/create-medication-form';

const CreateMedicationModal = () => {
    return <ModalWrapper modalKey={ModalKey.CREATE_MEDICATION} modalComponent={ModalComponent} />;
};

export default CreateMedicationModal;

export interface CreateMedicationModalComponentProps extends BaseModalComponentProps {
    onSubmit: (tempModel: MedicationTemp) => void;
}

const ModalComponent = ({ isOpen, closeModal, onSubmit }: CreateMedicationModalComponentProps) => {
    if (!onSubmit) {
        console.error('can not open modal because of invalid state');
        closeModal();
        return;
    }

    return (
        <ResourceModalComponent
            isOpen={isOpen}
            closeModal={closeModal}
            title="Izsiegtās zāles"
            description="Jauns ieraksts par izsniegtajām zālēm"
        >
            <CreateMedicationForm onSuccess={closeModal} onSubmit={onSubmit} />
        </ResourceModalComponent>
    );
};
