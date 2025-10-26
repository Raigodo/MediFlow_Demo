import ResourceModalComponent from '@/components/_shared/modal/variant/write/resource-modal-component';
import { AmbulanceCallTemp } from '@/lib/types/models/ambulance-call/ambulance-call-temp';
import { ModalKey } from '@/lib/types/values/modal-key';
import ModalWrapper, { BaseModalComponentProps } from '../../_shared/modal/modal-wrapper';
import CreateAmbulanceCallForm from '../form/create-ambulance-call-form';

const CreateAmbulanceCallModal = () => {
    return (
        <ModalWrapper modalKey={ModalKey.CREATE_AMBULANCE_CALL} modalComponent={ModalComponent} />
    );
};

export default CreateAmbulanceCallModal;

export interface CreateAmbulanceCallModalComponentProps extends BaseModalComponentProps {
    onSubmit: (tempModel: AmbulanceCallTemp) => void;
}

const ModalComponent = ({
    isOpen,
    closeModal,
    onSubmit,
}: CreateAmbulanceCallModalComponentProps) => {
    if (!onSubmit) {
        console.error('can not open modal because of invalid state');
        closeModal();
        return;
    }

    return (
        <ResourceModalComponent
            isOpen={isOpen}
            closeModal={closeModal}
            title="Ātrās palīdzības izsaukums"
            description="Jauns Ātrās palīdzības izsaukums"
        >
            <CreateAmbulanceCallForm onSuccess={closeModal} onSubmit={onSubmit} />
        </ResourceModalComponent>
    );
};
