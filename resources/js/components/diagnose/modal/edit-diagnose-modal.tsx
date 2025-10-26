import ResourceModalComponent from '@/components/_shared/modal/variant/write/resource-modal-component';
import { DiagnoseTemp } from '@/lib/types/models/diagnose/diagnose-temp';
import { ModalKey } from '@/lib/types/values/modal-key';
import ModalWrapper, { BaseModalComponentProps } from '../../_shared/modal/modal-wrapper';
import EditDiagnoseForm from '../form/edit-diagnose-form';

const EditDiagnoseModal = () => {
    return <ModalWrapper modalKey={ModalKey.EDIT_DIAGNOSE} modalComponent={ModalComponent} />;
};

export default EditDiagnoseModal;

export interface EditDiagnoseModalComponentProps extends BaseModalComponentProps {
    diagnose: DiagnoseTemp;
    onSubmit: (tempModel: DiagnoseTemp) => void;
    onDelete: (tempModel: DiagnoseTemp) => void;
}

const ModalComponent = ({
    isOpen,
    closeModal,
    diagnose,
    onSubmit,
    onDelete,
}: EditDiagnoseModalComponentProps) => {
    if (!diagnose || !onSubmit || !onDelete) {
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
            <EditDiagnoseForm
                onSuccess={closeModal}
                diagnose={diagnose}
                onSubmit={onSubmit}
                onDelete={onDelete}
            />
        </ResourceModalComponent>
    );
};
