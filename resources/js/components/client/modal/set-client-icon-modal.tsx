import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/_shared/ui/dialog';
import { ScrollArea } from '@/components/_shared/ui/scroll-area';
import { ClientPreviewResource } from '@/lib/types/models/client/client-resources';
import { ModalKey } from '@/lib/types/values/modal-key';
import ModalWrapper, { BaseModalComponentProps } from '../../_shared/modal/modal-wrapper';
import SetClientIconForm from '../form/set-client-icon-form';

const SetClientIconModal = () => {
    return <ModalWrapper modalKey={ModalKey.SET_CLIENT_ICON} modalComponent={ModalComponent} />;
};

export default SetClientIconModal;

export type SetClientIconModalComponentProps = BaseModalComponentProps & {
    client: ClientPreviewResource;
};

const ModalComponent = ({ isOpen, closeModal, client }: SetClientIconModalComponentProps) => {
    if (!client) {
        console.error('can not open modal because of invalid state');
        closeModal();
        return;
    }

    return (
        <Dialog open={isOpen} onOpenChange={(value) => value !== isOpen && !value && closeModal()}>
            <DialogContent className="grid max-h-[700px] w-fit grid-rows-[auto_minmax(0,1fr)]">
                <DialogHeader>
                    <DialogTitle>Set client icon</DialogTitle>
                </DialogHeader>

                <ScrollArea>
                    <SetClientIconForm client={client} onSuccess={closeModal} />
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};
