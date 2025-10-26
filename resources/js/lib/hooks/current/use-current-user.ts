import { SessionSlice } from '@/lib/types/slices/session-slice';
import { usePage } from '@inertiajs/react';

export function useCurrentUser() {
    const { session } = usePage<SessionSlice>().props;

    const user = session.data.user;
    if (!user) console.error('no current user');

    return user;
}
