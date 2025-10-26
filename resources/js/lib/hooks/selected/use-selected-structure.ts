import { SelectedSlice } from '@/lib/types/slices/selected-slice';
import { usePage } from '@inertiajs/react';

export function useSelectedStructure() {
    const { selected } = usePage<SelectedSlice>().props;
    const structure = selected?.structure;
    if (!structure) throw Error('no structure selected');
    return structure;
}
