import FilterModalComponent from '@/components/_shared/modal/variant/filter/filter-modal-shell';
import { ModalKey } from '@/lib/types/values/modal-key';
import ModalWrapper, { BaseModalComponentProps } from '../../_shared/modal/modal-wrapper';
import FilterMedicamentForm from '../form/filter-medicament-form';

const FilterMedicamentModal = () => {
    return <ModalWrapper modalKey={ModalKey.MEDICAMENT_FILTER} modalComponent={ModalComponent} />;
};

export default FilterMedicamentModal;

export type FilterMedicamentModalComponentProps = BaseModalComponentProps;

const ModalComponent = ({ isOpen, closeModal }: FilterMedicamentModalComponentProps) => {
    return (
        <FilterModalComponent isOpen={isOpen} closeModal={closeModal}>
            <FilterMedicamentForm onSuccess={closeModal} />
        </FilterModalComponent>
    );
};
