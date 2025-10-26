import { SessionSlice } from '@/lib/types/slices/session-slice';
import { usePage } from '@inertiajs/react';

export function useMeasurementTypes() {
    const { session } = usePage<SessionSlice>().props;

    const measurementTypes = session.data.measurementTypes;
    if (!measurementTypes) console.error('no measurement types');

    return measurementTypes;
}
