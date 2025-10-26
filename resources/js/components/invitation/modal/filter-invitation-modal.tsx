import FilterModalComponent from '@/components/_shared/modal/variant/filter/filter-modal-shell';
import { ModalKey } from '@/lib/types/values/modal-key';
import ModalWrapper, { BaseModalComponentProps } from '../../_shared/modal/modal-wrapper';
import FilterInvitationForm from '../form/filter-invitation-form';

const FilterInvitationModal = () => {
    return <ModalWrapper modalKey={ModalKey.INVITATION_FILTER} modalComponent={ModalComponent} />;
};

export default FilterInvitationModal;

export type InvitationFilterModalComponentProps = BaseModalComponentProps;

const ModalComponent = ({ isOpen, closeModal }: InvitationFilterModalComponentProps) => {
    return (
        <FilterModalComponent isOpen={isOpen} closeModal={closeModal}>
            <FilterInvitationForm onSuccess={closeModal} />
        </FilterModalComponent>
    );
};
