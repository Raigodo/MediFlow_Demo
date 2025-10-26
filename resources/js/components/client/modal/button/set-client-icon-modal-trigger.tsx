import ClientIcon from '@/components/_shared/image/client-icon';
import { Button } from '@/components/_shared/ui/button';
import { useModalManager } from '@/contexts/modal-manager-context';
import { ClientPreviewResource } from '@/lib/types/models/client/client-resources';
import { ModalKey } from '@/lib/types/values/modal-key';

function SetClientIconModalTrigger({ client }: { client: ClientPreviewResource }) {
    const { openModal } = useModalManager();

    function handleClick() {
        openModal({ key: ModalKey.SET_CLIENT_ICON, bag: { client } });
    }

    return (
        <Button
            type="button"
            variant={'transparent'}
            onClick={handleClick}
            className="size-fit p-0 hover:cursor-pointer"
        >
            <ClientIcon client={client.data} className="size-full" />
        </Button>
    );
}

export default SetClientIconModalTrigger;
