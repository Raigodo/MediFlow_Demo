import ResourceModalComponent from '@/components/_shared/modal/variant/write/resource-modal-component';
import { MeasurementTemp } from '@/lib/types/models/measurement/measurement-temp';
import { ModalKey } from '@/lib/types/values/modal-key';
import ModalWrapper, { BaseModalComponentProps } from '../../_shared/modal/modal-wrapper';
import EditMeasurementForm from '../form/edit-measurement-form';

const EditMeasurementModal = () => {
    return <ModalWrapper modalKey={ModalKey.EDIT_MEASUREMENT} modalComponent={ModalComponent} />;
};

export default EditMeasurementModal;

export interface EditMeasurementModalComponentProps extends BaseModalComponentProps {
    measurement: MeasurementTemp;
    onSubmit: (tempModel: MeasurementTemp) => void;
    onDelete: (tempModel: MeasurementTemp) => void;
}

const ModalComponent = ({
    isOpen,
    closeModal,
    measurement,
    onSubmit,
    onDelete,
}: EditMeasurementModalComponentProps) => {
    if (!measurement || !onSubmit || !onDelete) {
        console.error('can not open modal because of invalid state');
        closeModal();
        return;
    }

    return (
        <ResourceModalComponent
            isOpen={isOpen}
            closeModal={closeModal}
            title="Measurement"
            description="Jauns measurement"
        >
            <EditMeasurementForm
                onSuccess={closeModal}
                measurement={measurement}
                onSubmit={onSubmit}
                onDelete={onDelete}
            />
        </ResourceModalComponent>
    );
};
