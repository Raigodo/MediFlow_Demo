import { CollectionsSlice } from '@/lib/types/slices/collections-slice';
import { usePage } from '@inertiajs/react';

export function useEmployeeCollection() {
    const { collections } = usePage<CollectionsSlice>().props;
    const employees = collections.employees;
    if (!employees) throw Error('no employees collection');
    return employees;
}
