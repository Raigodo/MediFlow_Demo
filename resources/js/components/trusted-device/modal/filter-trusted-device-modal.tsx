import FilterModalComponent from '@/components/_shared/modal/variant/filter/filter-modal-shell';
import { ModalKey } from '@/lib/types/values/modal-key';
import ModalWrapper, { BaseModalComponentProps } from '../../_shared/modal/modal-wrapper';
import FilterTrustedDeviceForm from '../form/filter-trusted-device-form';

const FilterTrustedDeviceModal = () => {
    return (
        <ModalWrapper modalKey={ModalKey.TRUSTED_DEVICE_FILTER} modalComponent={ModalComponent} />
    );
};

export default FilterTrustedDeviceModal;

export type FilterTrustedDeviceModalComponentProps = BaseModalComponentProps;

const ModalComponent = ({ isOpen, closeModal }: FilterTrustedDeviceModalComponentProps) => {
    return (
        <FilterModalComponent isOpen={isOpen} closeModal={closeModal}>
            <FilterTrustedDeviceForm onSuccess={closeModal} />
        </FilterModalComponent>
    );
};
