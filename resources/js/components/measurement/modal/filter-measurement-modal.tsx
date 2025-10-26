import FilterModalComponent from '@/components/_shared/modal/variant/filter/filter-modal-shell';
import { ModalKey } from '@/lib/types/values/modal-key';
import ModalWrapper, { BaseModalComponentProps } from '../../_shared/modal/modal-wrapper';
import FilterMeasurementForm from '../form/filter-measurement-form';

const FilterMeasurementModal = () => {
    return <ModalWrapper modalKey={ModalKey.MEASUREMENT_FILTER} modalComponent={ModalComponent} />;
};

export default FilterMeasurementModal;

export type FilterMeasurementModalComponentProps = BaseModalComponentProps;

const ModalComponent = ({ isOpen, closeModal }: FilterMeasurementModalComponentProps) => {
    return (
        <FilterModalComponent isOpen={isOpen} closeModal={closeModal}>
            <FilterMeasurementForm onSuccess={closeModal} />
        </FilterModalComponent>
    );
};
