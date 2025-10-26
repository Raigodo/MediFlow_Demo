import { CollectionsSlice } from '@/lib/types/slices/collections-slice';
import { usePage } from '@inertiajs/react';

export function useClientCollection() {
    const { collections } = usePage<CollectionsSlice>().props;
    const clients = collections.clients;
    if (!clients) throw Error('no clients collection');
    return clients;
}
