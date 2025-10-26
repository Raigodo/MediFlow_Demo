import { CollectionsSlice } from '@/lib/types/slices/collections-slice';
import { usePage } from '@inertiajs/react';

export function usePagniatedClients() {
    const { collections } = usePage<CollectionsSlice>().props;
    const clients = collections.paginated.clients;
    if (!clients) throw Error('no paginated clients');
    return clients;
}
