import { CollectionsSlice } from '@/lib/types/slices/collections-slice';
import { usePage } from '@inertiajs/react';

export function usePagniatedStructures() {
    const { collections } = usePage<CollectionsSlice>().props;
    const structures = collections.paginated.structures;
    if (!structures) throw Error('no paginated structures');
    return structures;
}
