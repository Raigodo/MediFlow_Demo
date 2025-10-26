import { CollectionsSlice } from '@/lib/types/slices/collections-slice';
import { usePage } from '@inertiajs/react';

export function useMedicamentCollection() {
    const { collections } = usePage<CollectionsSlice>().props;
    const medicaments = collections.medicaments;
    if (!medicaments) throw Error('no medicaments collection');
    return medicaments;
}
