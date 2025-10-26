import { CollectionsSlice } from '@/lib/types/slices/collections-slice';
import { usePage } from '@inertiajs/react';

export function usePagniatedDiagnoses() {
    const { collections } = usePage<CollectionsSlice>().props;
    const diagnoses = collections.paginated.diagnoses;
    if (!diagnoses) throw Error('no paginated diagnoses');
    return diagnoses;
}
