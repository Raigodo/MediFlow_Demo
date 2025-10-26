import UserIcon from '@/components/_shared/image/user-icon';
import { Button } from '@/components/_shared/ui/button';
import { useModalManager } from '@/contexts/modal-manager-context';
import { UserPreviewResource } from '@/lib/types/models/user/user-resources';
import { ModalKey } from '@/lib/types/values/modal-key';

function SetProfileIconModalTrigger({ user }: { user: UserPreviewResource }) {
    const { openModal } = useModalManager();
    function handleClick() {
        openModal({ key: ModalKey.SET_PROFILE_ICON, bag: { user } });
    }

    return (
        <Button
            type="button"
            variant={'transparent'}
            onClick={handleClick}
            className="size-fit p-0 hover:cursor-pointer"
        >
            <UserIcon user={user.data} className="size-full" />
        </Button>
    );
}

export default SetProfileIconModalTrigger;
