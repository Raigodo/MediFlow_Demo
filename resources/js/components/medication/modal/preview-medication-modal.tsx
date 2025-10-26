import PreviewModalDateField from '@/components/_shared/modal/variant/preview/field/preview-modal-date-field';
import PreviewModalEmployeeFieldLink from '@/components/_shared/modal/variant/preview/field/preview-modal-employee-field';
import PreviewModalPlainField from '@/components/_shared/modal/variant/preview/field/preview-modal-plain-field';
import PreviewModal from '@/components/_shared/modal/variant/preview/preview-modal-shell';
import { useLocalEnum } from '@/lib/hooks/locale/useLocalEnum';
import { MedicationPreviewResource } from '@/lib/types/models/medication/medication-resources';
import { ModalKey } from '@/lib/types/values/modal-key';
import Wrapper, { BaseModalComponentProps } from '../../_shared/modal/modal-wrapper';

const PreviewMedicationModal = () => {
    return <Wrapper modalKey={ModalKey.PREVIEW_MEDICATION} modalComponent={ModalComponent} />;
};

export default PreviewMedicationModal;

export interface PreviewMedicationModalComponentProps extends BaseModalComponentProps {
    medication: MedicationPreviewResource;
}

const ModalComponent = ({
    isOpen,
    closeModal,
    medication,
}: PreviewMedicationModalComponentProps) => {
    const { employeeRole } = useLocalEnum();

    if (!medication) {
        console.error('can not open modal because of invalid state');
        closeModal();
        return;
    }

    return (
        <PreviewModal
            title="Priekšskatīt izsniegtos medikamentus"
            isOpen={isOpen}
            closeModal={closeModal}
            expandAction={medication.actions.show}
        >
            <PreviewModalEmployeeFieldLink label="Izveidoja" employee={medication.data.creator} />
            <PreviewModalPlainField
                label="Amats"
                value={employeeRole(medication.data.creator.data.role)}
            />
            <PreviewModalDateField label="Izveidots" value={medication.data.createdAt} />
        </PreviewModal>
    );
};
