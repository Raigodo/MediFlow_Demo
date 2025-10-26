import { SelectedSlice } from '@/lib/types/slices/selected-slice';
import { usePage } from '@inertiajs/react';

export function useSelectedMedicament() {
    const { selected } = usePage<SelectedSlice>().props;
    const medicament = selected?.medicament;
    if (!medicament) throw Error('no medicament selected');
    return medicament;
}
