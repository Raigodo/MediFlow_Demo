import { SessionSlice } from '@/lib/types/slices/session-slice';
import { usePage } from '@inertiajs/react';

export function useToolbar() {
    const { session } = usePage<SessionSlice>().props;
    if (!session) throw Error('no session provided');
    return session.data.toolbar;
}
