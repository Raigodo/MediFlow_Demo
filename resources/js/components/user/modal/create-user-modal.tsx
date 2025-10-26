import ResourceModalComponent from '@/components/_shared/modal/variant/write/resource-modal-component';
import { ModalKey } from '@/lib/types/values/modal-key';
import ModalWrapper, { BaseModalComponentProps } from '../../_shared/modal/modal-wrapper';
import CreateUserForm from '../form/create-user-form';

const CreateUserModal = () => {
    return <ModalWrapper modalKey={ModalKey.CREATE_USER} modalComponent={ModalComponent} />;
};

export default CreateUserModal;

export type CreateUserModalComponentProps = BaseModalComponentProps;

const ModalComponent = ({ isOpen, closeModal }: CreateUserModalComponentProps) => {
    return (
        <ResourceModalComponent
            isOpen={isOpen}
            closeModal={closeModal}
            title="Jauns lietotājs"
            description="Izveidot jaunu lietotāju"
        >
            <CreateUserForm onSuccess={closeModal} />
        </ResourceModalComponent>
    );
};
