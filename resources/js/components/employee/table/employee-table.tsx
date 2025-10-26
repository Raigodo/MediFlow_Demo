import UserIcon from '@/components/_shared/image/user-icon';
import {
    BaseTable,
    BaseTableCell,
    BaseTableHead,
    BaseTableImplementationProps,
    BaseTableRow,
} from '@/components/_shared/table/base-table';
import UserName from '@/components/_shared/user-name';
import { useModalManager } from '@/contexts/modal-manager-context';
import { useLocalDate } from '@/lib/hooks/locale/useLocalDate';
import { useLocalEnum } from '@/lib/hooks/locale/useLocalEnum';
import {
    EmployeeCollectionResource,
    EmployeePreviewResource,
} from '@/lib/types/models/employee/employee-resources';
import { ModalKey } from '@/lib/types/values/modal-key';
import { router } from '@inertiajs/react';

type EmployeeTableProps = BaseTableImplementationProps<EmployeeCollectionResource>;

function EmployeeTable({ collection, onItemClick, showPreview, ...rest }: EmployeeTableProps) {
    const { openModal } = useModalManager();
    const { defaultDate } = useLocalDate();
    const { employeeRole } = useLocalEnum();

    const items = collection.data;

    function handleItemClick(employee: EmployeePreviewResource) {
        if (onItemClick) onItemClick(employee);
        else if (showPreview) openModal({ key: ModalKey.PREVIEW_EMPLOYEE, bag: { employee } });
        else router.get(employee.actions.show.url);
    }

    return (
        <BaseTable
            title="Darbinieki"
            collection={items}
            filterModalKey={ModalKey.EMPLOYEE_FILTER}
            actions={{ title: 'Darbinieki', dropdown: collection.actions.dropdown }}
            {...rest}
            columnCount={4}
            renderHead={
                <>
                    <BaseTableHead className="w-[200px]">Pievienošanās Datums</BaseTableHead>
                    <BaseTableHead className="min-w-[8rem]">Vārds Uzvārds</BaseTableHead>
                    <BaseTableHead className="w-[200px]">Amats</BaseTableHead>
                    <BaseTableHead className="w-[200px]">Statuss</BaseTableHead>
                </>
            }
            renderRow={(item) => {
                return (
                    <BaseTableRow
                        key={item.data.id}
                        onClick={() => handleItemClick(item)}
                        actions={{ title: 'Darbinieks', dropdown: item.actions.dropdown }}
                    >
                        <BaseTableCell>{defaultDate(item.data.createdAt)}</BaseTableCell>
                        <BaseTableCell className="py-0">
                            <div className="flex items-center gap-3 py-1">
                                <UserIcon user={item.data.user?.data} />
                                <UserName user={item.data.user?.data} />
                            </div>
                        </BaseTableCell>
                        <BaseTableCell>{employeeRole(item.data.role)}</BaseTableCell>
                        <BaseTableCell>
                            {item.data.deactivatedAt ? 'Aizturēts' : 'Aktīvs'}
                        </BaseTableCell>
                    </BaseTableRow>
                );
            }}
        />
    );
}

export default EmployeeTable;
