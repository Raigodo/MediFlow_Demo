import FilterModalComponent from '@/components/_shared/modal/variant/filter/filter-modal-shell';
import { ModalKey } from '@/lib/types/values/modal-key';
import ModalWrapper, { BaseModalComponentProps } from '../../_shared/modal/modal-wrapper';
import FilterStructureForm from '../form/filter-structure-form';

const FilterStructureModal = () => {
    return <ModalWrapper modalKey={ModalKey.STRUCTURES_FILTER} modalComponent={ModalComponent} />;
};

export default FilterStructureModal;

export type FilterStructureModalComponentProps = BaseModalComponentProps;

const ModalComponent = ({ isOpen, closeModal }: FilterStructureModalComponentProps) => {
    return (
        <FilterModalComponent isOpen={isOpen} closeModal={closeModal}>
            <FilterStructureForm onSuccess={closeModal} />
        </FilterModalComponent>
    );
};
