import { CollectionsSlice } from '@/lib/types/slices/collections-slice';
import { usePage } from '@inertiajs/react';

export function usePagniatedMedicaments() {
    const { collections } = usePage<CollectionsSlice>().props;
    const medicaments = collections.paginated.medicaments;
    if (!medicaments) throw Error('no paginated medicaments');
    return medicaments;
}
