import { SelectedSlice } from '@/lib/types/slices/selected-slice';
import { usePage } from '@inertiajs/react';

export function useSelectedClient() {
    const { selected } = usePage<SelectedSlice>().props;
    const client = selected?.client;
    if (!client) throw Error('no client selected');
    return client;
}

export function useOptionalSelectedClient() {
    const { selected } = usePage<SelectedSlice>().props;
    return selected?.client;
}
