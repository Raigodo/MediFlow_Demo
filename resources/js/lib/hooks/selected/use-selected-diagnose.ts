import { SelectedSlice } from '@/lib/types/slices/selected-slice';
import { usePage } from '@inertiajs/react';

export function useSelectedDiagnose() {
    const { selected } = usePage<SelectedSlice>().props;
    const diagnose = selected?.diagnose;
    if (!diagnose) throw Error('no diagnose selected');
    return diagnose;
}
