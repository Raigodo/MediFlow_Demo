import { SelectedSlice } from '@/lib/types/slices/selected-slice';
import { usePage } from '@inertiajs/react';

export function useSelectedEmployee() {
    const { selected } = usePage<SelectedSlice>().props;
    const employee = selected?.employee;
    if (!employee) throw Error('no employee selected');
    return employee;
}
