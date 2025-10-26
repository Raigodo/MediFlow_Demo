import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/_shared/ui/dialog';
import { UserPreviewResource } from '@/lib/types/models/user/user-resources';
import { ModalKey } from '@/lib/types/values/modal-key';
import ModalWrapper, { BaseModalComponentProps } from '../../_shared/modal/modal-wrapper';
import { ScrollArea } from '../../_shared/ui/scroll-area';
import SetUserIconForm from '../form/set-user-icon-form';

const SetProfileIconModal = () => {
    return <ModalWrapper modalKey={ModalKey.SET_PROFILE_ICON} modalComponent={ModalComponent} />;
};

export default SetProfileIconModal;

export type SetProfileIconModalComponentProps = BaseModalComponentProps & {
    user: UserPreviewResource;
};

const ModalComponent = ({ isOpen, closeModal, user }: SetProfileIconModalComponentProps) => {
    if (!user) {
        console.error('can not open modal because of invalid state');
        closeModal();
        return;
    }

    return (
        <Dialog open={isOpen} onOpenChange={(value) => value !== isOpen && !value && closeModal()}>
            <DialogContent className="grid max-h-[700px] w-fit grid-rows-[auto_minmax(0,1fr)]">
                <DialogHeader>
                    <DialogTitle>Izveidot ielūgumu</DialogTitle>
                    <DialogDescription>Darbinieka ielūguma izveide uz kādu amatu</DialogDescription>
                </DialogHeader>

                <ScrollArea>
                    <SetUserIconForm user={user} onSuccess={closeModal} />
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};
