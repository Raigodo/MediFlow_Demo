import { CollectionsSlice } from '@/lib/types/slices/collections-slice';
import { usePage } from '@inertiajs/react';

export function usePagniatedAmbulanceCalls() {
    const { collections } = usePage<CollectionsSlice>().props;
    const ambulanceCalls = collections.paginated.ambulanceCalls;
    if (!ambulanceCalls) throw Error('no paginated ambulance calls');
    return ambulanceCalls;
}
