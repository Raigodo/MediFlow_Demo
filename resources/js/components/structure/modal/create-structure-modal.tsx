import ResourceModalComponent from '@/components/_shared/modal/variant/write/resource-modal-component';
import { ModalKey } from '@/lib/types/values/modal-key';
import ModalWrapper, { BaseModalComponentProps } from '../../_shared/modal/modal-wrapper';
import CreateStructureForm from '../form/create-structure-form';

const CreateStructureModal = () => {
    return <ModalWrapper modalKey={ModalKey.CREATE_STRUCTURE} modalComponent={ModalComponent} />;
};

export default CreateStructureModal;

export type CreateStructureModalComponentProps = BaseModalComponentProps;

const ModalComponent = ({ isOpen, closeModal }: CreateStructureModalComponentProps) => {
    return (
        <ResourceModalComponent
            isOpen={isOpen}
            closeModal={closeModal}
            title="Izveidot struktūrvienību"
            description="Izveidot jaunu struktūrvienību sistēmā"
        >
            <CreateStructureForm onSuccess={closeModal} />
        </ResourceModalComponent>
    );
};
