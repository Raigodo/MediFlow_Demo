import FilterModalComponent from '@/components/_shared/modal/variant/filter/filter-modal-shell';
import { ModalKey } from '@/lib/types/values/modal-key';
import ModalWrapper, { BaseModalComponentProps } from '../../_shared/modal/modal-wrapper';
import FilterDiagnoseForm from '../form/filter-diagnose-form';

const FilterDiagnoseModal = () => {
    return <ModalWrapper modalKey={ModalKey.DIAGNOSE_FILTER} modalComponent={ModalComponent} />;
};

export default FilterDiagnoseModal;

export type FilterDiagnoseModalComponentProps = BaseModalComponentProps;

const ModalComponent = ({ isOpen, closeModal }: FilterDiagnoseModalComponentProps) => {
    return (
        <FilterModalComponent isOpen={isOpen} closeModal={closeModal}>
            <FilterDiagnoseForm onSuccess={closeModal} />
        </FilterModalComponent>
    );
};
