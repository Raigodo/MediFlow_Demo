import FilterModalComponent from '@/components/_shared/modal/variant/filter/filter-modal-shell';
import { ModalKey } from '@/lib/types/values/modal-key';
import ModalWrapper, { BaseModalComponentProps } from '../../_shared/modal/modal-wrapper';
import FilterAmbulanceCallForm from '../form/filter-ambulance-call-form';

const FilterAmbulanceCallModal = () => {
    return (
        <ModalWrapper modalKey={ModalKey.AMBULANCE_CALL_FILTER} modalComponent={ModalComponent} />
    );
};

export default FilterAmbulanceCallModal;

export type FilterAmbulanceCallModalComponentProps = BaseModalComponentProps;

const ModalComponent = ({ isOpen, closeModal }: FilterAmbulanceCallModalComponentProps) => {
    return (
        <FilterModalComponent isOpen={isOpen} closeModal={closeModal}>
            <FilterAmbulanceCallForm onSuccess={closeModal} />
        </FilterModalComponent>
    );
};
