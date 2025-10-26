import FilterModalComponent from '@/components/_shared/modal/variant/filter/filter-modal-shell';
import { ModalKey } from '@/lib/types/values/modal-key';
import ModalWrapper, { BaseModalComponentProps } from '../../_shared/modal/modal-wrapper';
import FilterClientForm from '../form/filter-client-form';

const FilterClientModal = () => {
    return <ModalWrapper modalKey={ModalKey.CLIENT_FILTER} modalComponent={ModalComponent} />;
};

export default FilterClientModal;

export type FilterClientModalComponentProps = BaseModalComponentProps;

const ModalComponent = ({ isOpen, closeModal }: FilterClientModalComponentProps) => {
    return (
        <FilterModalComponent isOpen={isOpen} closeModal={closeModal}>
            <FilterClientForm onSuccess={closeModal} />
        </FilterModalComponent>
    );
};
