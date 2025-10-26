import { SelectedSlice } from '@/lib/types/slices/selected-slice';
import { usePage } from '@inertiajs/react';

export function useSelectedMeasurement() {
    const { selected } = usePage<SelectedSlice>().props;
    const measurement = selected?.measurement;
    if (!measurement) throw Error('no measurement selected');
    return measurement;
}
