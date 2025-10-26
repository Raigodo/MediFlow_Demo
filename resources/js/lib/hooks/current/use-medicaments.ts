import { SessionSlice } from '@/lib/types/slices/session-slice';
import { usePage } from '@inertiajs/react';

export function useMedicaments() {
    const { session } = usePage<SessionSlice>().props;

    const medicaments = session.data.medicaments;
    if (!medicaments) console.error('no medicaments');

    return medicaments;
}
