import { useModalManager } from '@/contexts/modal-manager-context';
import { FilterModalKey } from '@/lib/types/values/modal-key';
import { SlidersHorizontalIcon } from 'lucide-react';
import { Button } from '../../../ui/button';

function FilterModalTrigger({
    modalKey,
    className,
}: {
    modalKey: FilterModalKey;
    className?: string;
}) {
    const { openModal } = useModalManager();

    function openFilterModal() {
        openModal({ key: modalKey });
    }

    return (
        <Button variant={'ghost'} onClick={openFilterModal} className={className}>
            <SlidersHorizontalIcon /> Filtrēt
        </Button>
    );
}

export default FilterModalTrigger;
