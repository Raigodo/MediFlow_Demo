import FilterModalComponent from '@/components/_shared/modal/variant/filter/filter-modal-shell';
import { ModalKey } from '@/lib/types/values/modal-key';
import ModalWrapper, { BaseModalComponentProps } from '../../_shared/modal/modal-wrapper';
import FilterNoteForm from '../form/filter-note-form';

const FilterNoteModal = () => {
    return <ModalWrapper modalKey={ModalKey.NOTE_FILTER} modalComponent={ModalComponent} />;
};

export default FilterNoteModal;

export type FilterNoteModalComponentProps = BaseModalComponentProps;

const ModalComponent = ({ isOpen, closeModal }: FilterNoteModalComponentProps) => {
    return (
        <FilterModalComponent isOpen={isOpen} closeModal={closeModal}>
            <FilterNoteForm onSuccess={closeModal} />
        </FilterModalComponent>
    );
};
