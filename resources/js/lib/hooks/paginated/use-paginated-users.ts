import { CollectionsSlice } from '@/lib/types/slices/collections-slice';
import { usePage } from '@inertiajs/react';

export function usePagniatedUsers() {
    const { collections } = usePage<CollectionsSlice>().props;
    const users = collections?.paginated?.users;
    if (!users) throw Error('no paginated users');
    return users;
}
