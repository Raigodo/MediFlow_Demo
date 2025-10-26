import { SelectedSlice } from '@/lib/types/slices/selected-slice';
import { usePage } from '@inertiajs/react';

export function useSelectedMedication() {
    const { selected } = usePage<SelectedSlice>().props;
    const medication = selected?.medication;
    if (!medication) throw Error('no medication selected');
    return medication;
}
