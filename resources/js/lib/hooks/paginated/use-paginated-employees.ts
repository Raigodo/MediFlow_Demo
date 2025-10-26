import { CollectionsSlice } from '@/lib/types/slices/collections-slice';
import { usePage } from '@inertiajs/react';

export function usePagniatedEmployees() {
    const { collections } = usePage<CollectionsSlice>().props;
    const employees = collections.paginated.employees;
    if (!employees) throw Error('no paginated employees');
    return employees;
}
