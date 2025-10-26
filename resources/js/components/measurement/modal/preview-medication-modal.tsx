import PreviewModalDateField from '@/components/_shared/modal/variant/preview/field/preview-modal-date-field';
import PreviewModalEmployeeFieldLink from '@/components/_shared/modal/variant/preview/field/preview-modal-employee-field';
import PreviewModalPlainField from '@/components/_shared/modal/variant/preview/field/preview-modal-plain-field';
import PreviewModal from '@/components/_shared/modal/variant/preview/preview-modal-shell';
import { useLocalEnum } from '@/lib/hooks/locale/useLocalEnum';
import { MeasurementPreviewResource } from '@/lib/types/models/measurement/measurement-resources';
import { ModalKey } from '@/lib/types/values/modal-key';
import Wrapper, { BaseModalComponentProps } from '../../_shared/modal/modal-wrapper';

const PreviewMeasurementModal = () => {
    return <Wrapper modalKey={ModalKey.PREVIEW_MEASUREMENT} modalComponent={ModalComponent} />;
};

export default PreviewMeasurementModal;

export interface PreviewMeasurementModalComponentProps extends BaseModalComponentProps {
    measurement: MeasurementPreviewResource;
}

const ModalComponent = ({
    isOpen,
    closeModal,
    measurement,
}: PreviewMeasurementModalComponentProps) => {
    const { employeeRole } = useLocalEnum();

    if (!measurement) {
        console.error('can not open modal because of invalid state');
        closeModal();
        return;
    }

    return (
        <PreviewModal
            title="Priekšskatīt mērījumu"
            isOpen={isOpen}
            closeModal={closeModal}
            expandAction={measurement.actions.show}
        >
            <PreviewModalEmployeeFieldLink label="Izveidoja" employee={measurement.data.creator} />
            <PreviewModalPlainField
                label="Amats"
                value={employeeRole(measurement.data.creator.data.role)}
            />
            <PreviewModalDateField label="Izveidots" value={measurement.data.createdAt} />
        </PreviewModal>
    );
};
