import ResourceModalComponent from '@/components/_shared/modal/variant/write/resource-modal-component';
import { AmbulanceCallTemp } from '@/lib/types/models/ambulance-call/ambulance-call-temp';
import { ModalKey } from '@/lib/types/values/modal-key';
import ModalWrapper, { BaseModalComponentProps } from '../../_shared/modal/modal-wrapper';
import EditAmbulanceCallForm from '../form/edit-ambulance-call-form';

const EditAmbulanceCallModal = () => {
    return <ModalWrapper modalKey={ModalKey.EDIT_AMBULANCE_CALL} modalComponent={ModalComponent} />;
};

export default EditAmbulanceCallModal;

export interface EditAmbulanceCallModalComponentProps extends BaseModalComponentProps {
    ambulanceCall: AmbulanceCallTemp;
    onSubmit: (tempModel: AmbulanceCallTemp) => void;
    onDelete: (tempModel: AmbulanceCallTemp) => void;
}

const ModalComponent = ({
    isOpen,
    closeModal,
    ambulanceCall,
    onSubmit,
    onDelete,
}: EditAmbulanceCallModalComponentProps) => {
    if (!ambulanceCall || !onSubmit || !onDelete) {
        console.error('can not open modal because of invalid state');
        closeModal();
        return;
    }

    return (
        <ResourceModalComponent
            isOpen={isOpen}
            closeModal={closeModal}
            title="Ātrās palīdzības izsaukums"
            description="Rediģēt Ātrās palīdzības izsaukumu"
        >
            <EditAmbulanceCallForm
                ambulanceCall={ambulanceCall}
                onSuccess={closeModal}
                onSubmit={onSubmit}
                onDelete={onDelete}
            />
        </ResourceModalComponent>
    );
};
