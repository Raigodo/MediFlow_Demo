import { CollectionsSlice } from '@/lib/types/slices/collections-slice';
import { usePage } from '@inertiajs/react';

export function usePagniatedNotes() {
    const { collections } = usePage<CollectionsSlice>().props;
    const notes = collections.paginated.notes;
    if (!notes) throw Error('no paginated notes');
    return notes;
}
