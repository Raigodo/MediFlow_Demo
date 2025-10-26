import ResourceModalComponent from '@/components/_shared/modal/variant/write/resource-modal-component';
import { ModalKey } from '@/lib/types/values/modal-key';
import ModalWrapper, { BaseModalComponentProps } from '../../_shared/modal/modal-wrapper';
import CreateClientForm from '../form/create-client-form';

const CreateClientModal = () => {
    return <ModalWrapper modalKey={ModalKey.CREATE_CLIENT} modalComponent={DialogComponent} />;
};

export default CreateClientModal;

export type CreateClientModalComponentProps = BaseModalComponentProps;

const DialogComponent = ({ isOpen, closeModal }: CreateClientModalComponentProps) => {
    return (
        <ResourceModalComponent
            isOpen={isOpen}
            closeModal={closeModal}
            title="Klienta pievienošana"
            description="Jauna klienta pievienošana sistēmai"
        >
            <CreateClientForm onSuccess={closeModal} />
        </ResourceModalComponent>
    );
};
