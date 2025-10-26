import StructureIcon from '@/components/_shared/image/structure-icon';
import { Button } from '@/components/_shared/ui/button';
import { useModalManager } from '@/contexts/modal-manager-context';
import { StructurePreviewResource } from '@/lib/types/models/structure/structure-resources';
import { ModalKey } from '@/lib/types/values/modal-key';

function SetStructureIconModalTrigger({ structure }: { structure: StructurePreviewResource }) {
    const { openModal } = useModalManager();

    function handleClick() {
        openModal({ key: ModalKey.SET_STRUCTURE_ICON, bag: { structure } });
    }

    return (
        <Button
            type="button"
            variant={'transparent'}
            onClick={handleClick}
            className="size-fit p-0 hover:cursor-pointer"
        >
            <StructureIcon structure={structure.data} className="size-full" />
        </Button>
    );
}

export default SetStructureIconModalTrigger;
