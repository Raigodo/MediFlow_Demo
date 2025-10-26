import PreviewModalDateField from '@/components/_shared/modal/variant/preview/field/preview-modal-date-field';
import PreviewModalEmployeeFieldLink from '@/components/_shared/modal/variant/preview/field/preview-modal-employee-field';
import PreviewModalPlainField from '@/components/_shared/modal/variant/preview/field/preview-modal-plain-field';
import PreviewModal from '@/components/_shared/modal/variant/preview/preview-modal-shell';
import { useLocalEnum } from '@/lib/hooks/locale/useLocalEnum';
import { InvitationPreviewResource } from '@/lib/types/models/invitation/invitation-resources';
import { ModalKey } from '@/lib/types/values/modal-key';
import Wrapper, { BaseModalComponentProps } from '../../_shared/modal/modal-wrapper';

const PreviewInvitationModal = () => {
    return <Wrapper modalKey={ModalKey.PREVIEW_INVITATION} modalComponent={ModalComponent} />;
};

export default PreviewInvitationModal;

export interface PreviewInvitationModalComponentProps extends BaseModalComponentProps {
    invitation: InvitationPreviewResource;
}

const ModalComponent = ({
    isOpen,
    closeModal,
    invitation,
}: PreviewInvitationModalComponentProps) => {
    const { employeeRole } = useLocalEnum();

    if (!invitation) {
        console.error('can not open modal because of invalid state');
        closeModal();
        return;
    }

    return (
        <PreviewModal
            title="Priekšskatīt ielūgumu"
            isOpen={isOpen}
            closeModal={closeModal}
            expandAction={invitation.actions.show}
        >
            <PreviewModalPlainField label="Amats" value={employeeRole(invitation.data.role)} />
            <PreviewModalDateField label="Izveidots" value={invitation.data.createdAt} />
            {invitation.data.createdEmployee && (
                <PreviewModalEmployeeFieldLink
                    label="Izlietoja"
                    employee={invitation.data.createdEmployee}
                />
            )}
        </PreviewModal>
    );
};
