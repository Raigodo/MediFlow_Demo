import { SelectedSlice } from '@/lib/types/slices/selected-slice';
import { SidelistSlice } from '@/lib/types/slices/sidelists-slice';
import { usePage } from '@inertiajs/react';

export function useClientSidelist() {
    const { sidelists } = usePage<SidelistSlice>().props;
    const { selected } = usePage<SelectedSlice>().props;

    const sidelist = sidelists?.clients;
    const client = selected?.client;

    return (
        sidelist && {
            ...sidelist,
            client,
        }
    );
}
