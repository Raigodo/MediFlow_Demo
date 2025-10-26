import PreviewModal from '@/components/_shared/modal/variant/preview/preview-modal-shell';
import { StructurePreviewResource } from '@/lib/types/models/structure/structure-resources';
import { ModalKey } from '@/lib/types/values/modal-key';
import Wrapper, { BaseModalComponentProps } from '../../_shared/modal/modal-wrapper';

const PreviewStructureModal = () => {
    return <Wrapper modalKey={ModalKey.PREVIEW_STRUCTURE} modalComponent={ModalComponent} />;
};

export default PreviewStructureModal;

export interface PreviewStructureModalComponentProps extends BaseModalComponentProps {
    structure: StructurePreviewResource;
}

const ModalComponent = ({ isOpen, closeModal, structure }: PreviewStructureModalComponentProps) => {
    if (!structure) {
        console.error('can not open modal because of invalid state');
        closeModal();
        return;
    }

    return (
        <PreviewModal
            title="Priekšskatīt struktūrvienību"
            isOpen={isOpen}
            closeModal={closeModal}
            expandAction={structure.actions.show}
        >
            <></>
        </PreviewModal>
    );
};
