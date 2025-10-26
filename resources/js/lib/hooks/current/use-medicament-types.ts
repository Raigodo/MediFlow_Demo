import { SessionSlice } from '@/lib/types/slices/session-slice';
import { usePage } from '@inertiajs/react';

export function useMedicamentTypes() {
    const { session } = usePage<SessionSlice>().props;

    const medicamentTypes = session.data.medicamentTypes;
    if (!medicamentTypes) console.error('no medicament types');

    return medicamentTypes;
}
