import { SessionSlice } from '@/lib/types/slices/session-slice';
import { usePage } from '@inertiajs/react';

export function useAccessibleStructures() {
    const { session } = usePage<SessionSlice>().props;

    const structures = session.data.structures;
    if (!structures) console.error('no accessible structures');

    return structures;
}
