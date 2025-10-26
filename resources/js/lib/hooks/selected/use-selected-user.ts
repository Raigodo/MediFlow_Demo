import { SelectedSlice } from '@/lib/types/slices/selected-slice';
import { usePage } from '@inertiajs/react';

export function useSelectedUser() {
    const { selected } = usePage<SelectedSlice>().props;
    const user = selected?.user;
    if (!user) throw Error('no user selected');
    return user;
}
