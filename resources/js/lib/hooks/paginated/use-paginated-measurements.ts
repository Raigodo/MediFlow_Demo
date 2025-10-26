import { CollectionsSlice } from '@/lib/types/slices/collections-slice';
import { usePage } from '@inertiajs/react';

export function usePagniatedMeasurements() {
    const { collections } = usePage<CollectionsSlice>().props;
    const measurements = collections.paginated.measurements;
    if (!measurements) throw Error('no paginated measurements');
    return measurements;
}
