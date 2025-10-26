import { SessionSlice } from '@/lib/types/slices/session-slice';
import { usePage } from '@inertiajs/react';

export function useCurrentStructure() {
    const { session } = usePage<SessionSlice>().props;

    const structure = session.data.structure;
    if (!structure) console.error('no current structure');

    return structure ?? undefined;
}
