import { SessionSlice } from '@/lib/types/slices/session-slice';
import { usePage } from '@inertiajs/react';

export function useCurrentEmployee() {
    const { session } = usePage<SessionSlice>().props;

    const employee = session.data.employee;
    if (!employee) console.error('no current employee');

    return employee;
}
