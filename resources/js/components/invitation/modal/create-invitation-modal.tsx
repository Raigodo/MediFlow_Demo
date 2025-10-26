import ResourceModalComponent from '@/components/_shared/modal/variant/write/resource-modal-component';
import { ModalKey } from '@/lib/types/values/modal-key';
import ModalWrapper, { BaseModalComponentProps } from '../../_shared/modal/modal-wrapper';
import CreateInvitationForm from '../form/create-invitation-form';

const CreateInvitationModal = () => {
    return <ModalWrapper modalKey={ModalKey.CREATE_INVITATION} modalComponent={ModalComponent} />;
};

export default CreateInvitationModal;

export type CreateInvitationModalComponentProps = BaseModalComponentProps;

const ModalComponent = ({ isOpen, closeModal }: CreateInvitationModalComponentProps) => {
    return (
        <ResourceModalComponent
            isOpen={isOpen}
            closeModal={closeModal}
            title="Izveidot ielūgumu"
            description="izveidot Darbinieka ielūguma uz kādu amatu"
        >
            <CreateInvitationForm onSuccess={closeModal} />
        </ResourceModalComponent>
    );
};
