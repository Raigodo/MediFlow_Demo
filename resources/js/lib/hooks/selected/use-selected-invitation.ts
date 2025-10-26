import { SelectedSlice } from '@/lib/types/slices/selected-slice';
import { usePage } from '@inertiajs/react';

export function useSelectedInvitation() {
    const { selected } = usePage<SelectedSlice>().props;
    const invitation = selected?.invitation;
    if (!invitation) throw Error('no invitation selected');
    return invitation;
}
