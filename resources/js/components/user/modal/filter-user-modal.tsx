import FilterModalComponent from '@/components/_shared/modal/variant/filter/filter-modal-shell';
import { ModalKey } from '@/lib/types/values/modal-key';
import ModalWrapper, { BaseModalComponentProps } from '../../_shared/modal/modal-wrapper';
import FilterUserForm from '../form/filter-user-form';

const FilterUserModal = () => {
    return <ModalWrapper modalKey={ModalKey.USER_FILTER} modalComponent={ModalComponent} />;
};

export default FilterUserModal;

export type FilterUserModalComponentProps = BaseModalComponentProps;

const ModalComponent = ({ isOpen, closeModal }: FilterUserModalComponentProps) => {
    return (
        <FilterModalComponent isOpen={isOpen} closeModal={closeModal}>
            <FilterUserForm onSuccess={closeModal} />
        </FilterModalComponent>
    );
};
