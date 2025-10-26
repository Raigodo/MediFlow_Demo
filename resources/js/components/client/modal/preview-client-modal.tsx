import PreviewModalDateField from '@/components/_shared/modal/variant/preview/field/preview-modal-date-field';
import PreviewModalPlainField from '@/components/_shared/modal/variant/preview/field/preview-modal-plain-field';
import PreviewModal from '@/components/_shared/modal/variant/preview/preview-modal-shell';
import { ClientPreviewResource } from '@/lib/types/models/client/client-resources';
import { ModalKey } from '@/lib/types/values/modal-key';
import Wrapper, { BaseModalComponentProps } from '../../_shared/modal/modal-wrapper';

const PreviewClientModal = () => {
    return <Wrapper modalKey={ModalKey.PREVIEW_CLIENT} modalComponent={ModalComponent} />;
};

export default PreviewClientModal;

export interface PreviewClientModalComponentProps extends BaseModalComponentProps {
    client: ClientPreviewResource;
}

const ModalComponent = ({ isOpen, closeModal, client }: PreviewClientModalComponentProps) => {
    if (!client) {
        console.error('can not open modal because of invalid state');
        closeModal();
        return;
    }

    return (
        <PreviewModal
            title="Priekšskatīt klientu"
            isOpen={isOpen}
            closeModal={closeModal}
            expandAction={client.actions.show}
        >
            <PreviewModalPlainField
                label="Vārds Uzvārds"
                value={`${client.data.name} ${client.data.surname}`}
            />
            <PreviewModalDateField label="Pievienojās" value={client.data.joinedOn} />
            {client.data.archivedOn && (
                <PreviewModalDateField label="Arhivēts" value={client.data.archivedOn} />
            )}
        </PreviewModal>
    );
};
