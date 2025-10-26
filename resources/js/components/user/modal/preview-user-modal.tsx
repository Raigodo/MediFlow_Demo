import PreviewModalPlainField from '@/components/_shared/modal/variant/preview/field/preview-modal-plain-field';
import PreviewModal from '@/components/_shared/modal/variant/preview/preview-modal-shell';
import { UserPreviewResource } from '@/lib/types/models/user/user-resources';
import { ModalKey } from '@/lib/types/values/modal-key';
import Wrapper, { BaseModalComponentProps } from '../../_shared/modal/modal-wrapper';

const PreviewUserModal = () => {
    return <Wrapper modalKey={ModalKey.PREVIEW_USER} modalComponent={ModalComponent} />;
};

export default PreviewUserModal;

export interface PreviewUserModalComponentProps extends BaseModalComponentProps {
    user: UserPreviewResource;
}

const ModalComponent = ({ isOpen, closeModal, user }: PreviewUserModalComponentProps) => {
    if (!user) {
        console.error('can not open modal because of invalid state');
        closeModal();
        return;
    }

    return (
        <PreviewModal
            title="Priekšskatīt lietotāju"
            isOpen={isOpen}
            closeModal={closeModal}
            expandAction={user.actions.show}
        >
            <PreviewModalPlainField
                label="Vārds Uzvārds"
                value={`${user.data.name} ${user.data.surname}`}
            />
        </PreviewModal>
    );
};
