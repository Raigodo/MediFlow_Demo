import { SelectedSlice } from '@/lib/types/slices/selected-slice';
import { usePage } from '@inertiajs/react';

export function useSelectedAmbulanceCall() {
    const { selected } = usePage<SelectedSlice>().props;
    const ambulanceCall = selected?.ambulanceCall;
    if (!ambulanceCall) throw Error('no ambulanceCall selected');
    return ambulanceCall;
}
