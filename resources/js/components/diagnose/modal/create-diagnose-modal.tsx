import ResourceModalComponent from '@/components/_shared/modal/variant/write/resource-modal-component';
import { DiagnoseTemp } from '@/lib/types/models/diagnose/diagnose-temp';
import { ModalKey } from '@/lib/types/values/modal-key';
import ModalWrapper, { BaseModalComponentProps } from '../../_shared/modal/modal-wrapper';
import CreateDiagnoseForm from '../form/create-diagnose-form';

const CreateDiagnoseModal = () => {
    return <ModalWrapper modalKey={ModalKey.CREATE_DIAGNOSE} modalComponent={ModalComponent} />;
};

export default CreateDiagnoseModal;

export interface CreateDiagnoseModalComponentProps extends BaseModalComponentProps {
    onSubmit: (tempModel: DiagnoseTemp) => void;
}

const ModalComponent = ({ isOpen, closeModal, onSubmit }: CreateDiagnoseModalComponentProps) => {
    if (!onSubmit) {
        console.error('can not open modal because of invalid state');
        closeModal();
        return;
    }

    return (
        <ResourceModalComponent
            isOpen={isOpen}
            closeModal={closeModal}
            title="Diagnoze"
            description="Jauna Diagnoze"
        >
            <CreateDiagnoseForm onSuccess={closeModal} onSubmit={onSubmit} />
        </ResourceModalComponent>
    );
};
