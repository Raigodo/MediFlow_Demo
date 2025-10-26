import ResourceModalComponent from '@/components/_shared/modal/variant/write/resource-modal-component';
import { MeasurementTemp } from '@/lib/types/models/measurement/measurement-temp';
import { ModalKey } from '@/lib/types/values/modal-key';
import ModalWrapper, { BaseModalComponentProps } from '../../_shared/modal/modal-wrapper';
import CreateMeasurementForm from '../form/create-measurement-form';

const CreateMeasurementModal = () => {
    return <ModalWrapper modalKey={ModalKey.CREATE_MEASUREMENT} modalComponent={ModalComponent} />;
};

export default CreateMeasurementModal;

export interface CreateMeasurementModalComponentProps extends BaseModalComponentProps {
    onSubmit: (tempModel: MeasurementTemp) => void;
}

const ModalComponent = ({ isOpen, closeModal, onSubmit }: CreateMeasurementModalComponentProps) => {
    if (!onSubmit) {
        console.error('can not open modal because of invalid state');
        closeModal();
        return;
    }

    return (
        <ResourceModalComponent
            isOpen={isOpen}
            closeModal={closeModal}
            title="Jauns Mērījums"
            description="Jauns ieraksts par veikto mērījumu"
        >
            <CreateMeasurementForm onSuccess={closeModal} onSubmit={onSubmit} />
        </ResourceModalComponent>
    );
};
