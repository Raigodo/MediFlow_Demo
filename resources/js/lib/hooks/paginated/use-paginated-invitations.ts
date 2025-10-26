import { CollectionsSlice } from '@/lib/types/slices/collections-slice';
import { usePage } from '@inertiajs/react';

export function usePagniatedInvitations() {
    const { collections } = usePage<CollectionsSlice>().props;
    const invitations = collections.paginated.invitations;
    if (!invitations) throw Error('no paginated invitations');
    return invitations;
}
