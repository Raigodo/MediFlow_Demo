import PreviewModalDateField from '@/components/_shared/modal/variant/preview/field/preview-modal-date-field';
import PreviewModalEmployeeFieldLink from '@/components/_shared/modal/variant/preview/field/preview-modal-employee-field';
import PreviewModalPlainField from '@/components/_shared/modal/variant/preview/field/preview-modal-plain-field';
import PreviewModal from '@/components/_shared/modal/variant/preview/preview-modal-shell';
import { useLocalEnum } from '@/lib/hooks/locale/useLocalEnum';
import { DiagnosePreviewResource } from '@/lib/types/models/diagnose/diagnose-resources';
import { ModalKey } from '@/lib/types/values/modal-key';
import Wrapper, { BaseModalComponentProps } from '../../_shared/modal/modal-wrapper';

const PreviewDiagnoseModal = () => {
    return <Wrapper modalKey={ModalKey.PREVIEW_DIAGNOSE} modalComponent={ModalComponent} />;
};

export default PreviewDiagnoseModal;

export interface PreviewDiagnoseModalComponentProps extends BaseModalComponentProps {
    diagnose: DiagnosePreviewResource;
}

const ModalComponent = ({ isOpen, closeModal, diagnose }: PreviewDiagnoseModalComponentProps) => {
    const { employeeRole } = useLocalEnum();

    if (!diagnose) {
        console.error('can not open modal because of invalid state');
        closeModal();
        return;
    }

    return (
        <PreviewModal
            title="Priekšskatīt diagnozi"
            isOpen={isOpen}
            closeModal={closeModal}
            expandAction={diagnose.actions.show}
        >
            <PreviewModalEmployeeFieldLink label="Izveidoja" employee={diagnose.data.creator} />
            <PreviewModalPlainField
                label="Amats"
                value={employeeRole(diagnose.data.creator.data.role)}
            />
            <PreviewModalDateField label="Izveidots" value={diagnose.data.createdAt} />
        </PreviewModal>
    );
};
