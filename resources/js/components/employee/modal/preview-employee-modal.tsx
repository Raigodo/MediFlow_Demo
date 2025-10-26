import PreviewModalDateField from '@/components/_shared/modal/variant/preview/field/preview-modal-date-field';
import PreviewModal from '@/components/_shared/modal/variant/preview/preview-modal-shell';
import { EmployeePreviewResource } from '@/lib/types/models/employee/employee-resources';
import { ModalKey } from '@/lib/types/values/modal-key';
import Wrapper, { BaseModalComponentProps } from '../../_shared/modal/modal-wrapper';

const PreviewEmployeeModal = () => {
    return <Wrapper modalKey={ModalKey.PREVIEW_EMPLOYEE} modalComponent={ModalComponent} />;
};

export default PreviewEmployeeModal;

export interface PreviewEmployeeModalComponentProps extends BaseModalComponentProps {
    employee: EmployeePreviewResource;
}

const ModalComponent = ({ isOpen, closeModal, employee }: PreviewEmployeeModalComponentProps) => {
    if (!employee) {
        console.error('can not open modal because of invalid state');
        closeModal();
        return;
    }

    return (
        <PreviewModal
            title="Priekšskatīt darbinieku"
            isOpen={isOpen}
            closeModal={closeModal}
            expandAction={employee.actions.show}
        >
            <PreviewModalDateField label="Izveidots" value={employee.data.createdAt} />
        </PreviewModal>
    );
};
