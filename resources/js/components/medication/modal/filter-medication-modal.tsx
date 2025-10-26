import FilterModalComponent from '@/components/_shared/modal/variant/filter/filter-modal-shell';
import { ModalKey } from '@/lib/types/values/modal-key';
import ModalWrapper, { BaseModalComponentProps } from '../../_shared/modal/modal-wrapper';
import FilterMedicationForm from '../form/filter-medication-form';

const FilterMedicationModal = () => {
    return <ModalWrapper modalKey={ModalKey.MEDICATION_FILTER} modalComponent={ModalComponent} />;
};

export default FilterMedicationModal;

export type FilterMedicationModalComponentProps = BaseModalComponentProps;

const ModalComponent = ({ isOpen, closeModal }: FilterMedicationModalComponentProps) => {
    return (
        <FilterModalComponent isOpen={isOpen} closeModal={closeModal}>
            <FilterMedicationForm onSuccess={closeModal} />
        </FilterModalComponent>
    );
};
