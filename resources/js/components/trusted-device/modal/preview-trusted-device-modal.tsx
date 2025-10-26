import PreviewModalDateField from '@/components/_shared/modal/variant/preview/field/preview-modal-date-field';
import PreviewModal from '@/components/_shared/modal/variant/preview/preview-modal-shell';
import { TrustedDevicePreviewResource } from '@/lib/types/models/trusted-device/trusted-device-resources';
import { ModalKey } from '@/lib/types/values/modal-key';
import Wrapper, { BaseModalComponentProps } from '../../_shared/modal/modal-wrapper';

const PreviewTrustedDeviceModal = () => {
    return <Wrapper modalKey={ModalKey.PREVIEW_DEVICE} modalComponent={ModalComponent} />;
};

export default PreviewTrustedDeviceModal;

export interface PreviewTrustedDeviceModalComponentProps extends BaseModalComponentProps {
    device: TrustedDevicePreviewResource;
}

const ModalComponent = ({
    isOpen,
    closeModal,
    device,
}: PreviewTrustedDeviceModalComponentProps) => {
    if (!device) {
        console.error('can not open modal because of invalid state');
        closeModal();
        return;
    }

    return (
        <PreviewModal
            title="Priekšskatīt darba ierīci"
            isOpen={isOpen}
            closeModal={closeModal}
            expandAction={device.actions.show}
        >
            <PreviewModalDateField label="Izveidots" value={device.data.createdAt} />
        </PreviewModal>
    );
};
