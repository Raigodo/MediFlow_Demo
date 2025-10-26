import { CollectionsSlice } from '@/lib/types/slices/collections-slice';
import { usePage } from '@inertiajs/react';

export function usePagniatedMedications() {
    const { collections } = usePage<CollectionsSlice>().props;
    const medications = collections.paginated.medications;
    if (!medications) throw Error('no paginated medications');
    return medications;
}
