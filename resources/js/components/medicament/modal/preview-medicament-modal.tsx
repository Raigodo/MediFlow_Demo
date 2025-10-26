import PreviewModalPlainField from '@/components/_shared/modal/variant/preview/field/preview-modal-plain-field';
import PreviewModal from '@/components/_shared/modal/variant/preview/preview-modal-shell';
import { MedicamentPreviewResource } from '@/lib/types/models/medicament/medicament-resources';
import { ModalKey } from '@/lib/types/values/modal-key';
import Wrapper, { BaseModalComponentProps } from '../../_shared/modal/modal-wrapper';

const PreviewMedicamentModal = () => {
    return <Wrapper modalKey={ModalKey.PREVIEW_MEDICAMENT} modalComponent={ModalComponent} />;
};

export default PreviewMedicamentModal;

export interface PreviewMedicamentModalComponentProps extends BaseModalComponentProps {
    medicament: MedicamentPreviewResource;
}

const ModalComponent = ({
    isOpen,
    closeModal,
    medicament,
}: PreviewMedicamentModalComponentProps) => {
    if (!medicament) {
        console.error('can not open modal because of invalid state');
        closeModal();
        return;
    }

    return (
        <PreviewModal
            title="Priekšskatīt medikamentus"
            isOpen={isOpen}
            closeModal={closeModal}
            expandAction={medicament.actions.show}
        >
            <PreviewModalPlainField
                label="Nosaukums"
                value={medicament.data.medicamentType.data.name}
            />
            <PreviewModalPlainField
                label="Daudzums"
                value={medicament.data.amount}
                postfix={medicament.data.medicamentType.data.form}
            />
        </PreviewModal>
    );
};
