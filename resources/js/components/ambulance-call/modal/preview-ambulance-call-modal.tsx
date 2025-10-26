import PreviewModalDateField from '@/components/_shared/modal/variant/preview/field/preview-modal-date-field';
import PreviewModalEmployeeFieldLink from '@/components/_shared/modal/variant/preview/field/preview-modal-employee-field';
import PreviewModalPlainField from '@/components/_shared/modal/variant/preview/field/preview-modal-plain-field';
import PreviewModal from '@/components/_shared/modal/variant/preview/preview-modal-shell';
import { useLocalEnum } from '@/lib/hooks/locale/useLocalEnum';
import { AmbulanceCallPreviewResource } from '@/lib/types/models/ambulance-call/ambulance-call-resources';
import { ModalKey } from '@/lib/types/values/modal-key';
import Wrapper, { BaseModalComponentProps } from '../../_shared/modal/modal-wrapper';

const PreviewAmbulanceCallModal = () => {
    return <Wrapper modalKey={ModalKey.PREVIEW_AMBULANCE_CALL} modalComponent={ModalComponent} />;
};

export default PreviewAmbulanceCallModal;

export interface PreviewAmbulanceCallModalComponentProps extends BaseModalComponentProps {
    ambulanceCall?: AmbulanceCallPreviewResource;
}

const ModalComponent = ({
    isOpen,
    closeModal,
    ambulanceCall,
}: PreviewAmbulanceCallModalComponentProps) => {
    const { employeeRole } = useLocalEnum();

    if (!ambulanceCall) {
        console.error('can not open modal because of invalid state');
        closeModal();
        return;
    }

    return (
        <PreviewModal
            title="Priekšskatīt izsaukumu"
            isOpen={isOpen}
            closeModal={closeModal}
            expandAction={ambulanceCall.actions.show}
        >
            <PreviewModalEmployeeFieldLink
                label="Izveidoja"
                employee={ambulanceCall.data.creator}
            />
            <PreviewModalPlainField
                label="Amats"
                value={employeeRole(ambulanceCall.data.creator.data.role)}
            />
            <PreviewModalDateField label="Izveidots" value={ambulanceCall.data.createdAt} />
            <PreviewModalPlainField label="Iznākums" value={ambulanceCall.data.result} />
        </PreviewModal>
    );
};
