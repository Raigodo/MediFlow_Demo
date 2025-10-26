import FilterModalComponent from '@/components/_shared/modal/variant/filter/filter-modal-shell';
import { ModalKey } from '@/lib/types/values/modal-key';
import ModalWrapper, { BaseModalComponentProps } from '../../_shared/modal/modal-wrapper';
import FilterEmployeeForm from '../form/filter-employee-form';

const FilterEmployeeModal = () => {
    return <ModalWrapper modalKey={ModalKey.EMPLOYEE_FILTER} modalComponent={ModalComponent} />;
};

export default FilterEmployeeModal;

export type FilterEmployeeModalComponentProps = BaseModalComponentProps;

const ModalComponent = ({ isOpen, closeModal }: FilterEmployeeModalComponentProps) => {
    return (
        <FilterModalComponent isOpen={isOpen} closeModal={closeModal}>
            <FilterEmployeeForm onSuccess={closeModal} />
        </FilterModalComponent>
    );
};
