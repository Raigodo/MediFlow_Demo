import { SelectedSlice } from '@/lib/types/slices/selected-slice';
import { usePage } from '@inertiajs/react';

export function useSelectedDevice() {
    const { selected } = usePage<SelectedSlice>().props;
    const device = selected?.device;
    if (!device) throw Error('no device selected');
    return device;
}
