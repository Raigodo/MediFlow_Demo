import { CollectionsSlice } from '@/lib/types/slices/collections-slice';
import { usePage } from '@inertiajs/react';

export function usePagniatedTrustedDevices() {
    const { collections } = usePage<CollectionsSlice>().props;
    const trustedDevices = collections.paginated.devices;
    if (!trustedDevices) throw Error('no paginated trusted device');
    return trustedDevices;
}
