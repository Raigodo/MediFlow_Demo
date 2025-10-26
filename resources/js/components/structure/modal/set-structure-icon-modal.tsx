import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/_shared/ui/dialog';
import { ScrollArea } from '@/components/_shared/ui/scroll-area';
import { StructurePreviewResource } from '@/lib/types/models/structure/structure-resources';
import { ModalKey } from '@/lib/types/values/modal-key';
import ModalWrapper, { BaseModalComponentProps } from '../../_shared/modal/modal-wrapper';
import SetStructureIconForm from '../form/set-structure-icon-form';

const SetStructureIconModal = () => {
    return <ModalWrapper modalKey={ModalKey.SET_STRUCTURE_ICON} modalComponent={ModalComponent} />;
};

export default SetStructureIconModal;

export type SetStructureIconModalComponentProps = BaseModalComponentProps & {
    structure: StructurePreviewResource;
};

const ModalComponent = ({ isOpen, closeModal, structure }: SetStructureIconModalComponentProps) => {
    if (!structure) {
        console.error('can not open modal because of invalid state');
        closeModal();
        return;
    }

    return (
        <Dialog open={isOpen} onOpenChange={(value) => value !== isOpen && !value && closeModal()}>
            <DialogContent className="grid max-h-[700px] w-fit grid-rows-[auto_minmax(0,1fr)]">
                <DialogHeader>
                    <DialogTitle>Izveidot Struktūrvienību</DialogTitle>
                    <DialogDescription>Jaunas struktūrvienības izveide</DialogDescription>
                </DialogHeader>

                <ScrollArea>
                    <SetStructureIconForm structure={structure} onSuccess={closeModal} />
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};
