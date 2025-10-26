import BasePagination from '@/components/_shared/table/pagination';
import UserTable from '@/components/user/table/user-table';
import AppLayout from '@/layouts/app-layout';
import CentredLayout from '@/layouts/centred-layout';
import TablePagelayout from '@/layouts/table-page-layout';
import { usePagniatedUsers } from '@/lib/hooks/paginated/use-paginated-users';

function ShowManagerPage() {
    const { collection, filter, ...rest } = usePagniatedUsers();

    return (
        <AppLayout
        // backStack={[
        //     { label: 'Lietotāji', href: admin ? routeTo.user.index().path : undefined },
        //     { label: 'Skatīt' },
        // ]}
        >
            <CentredLayout>
                <TablePagelayout>
                    <BasePagination className="min-h-full" pagination={rest} paginationBag={filter}>
                        <UserTable collection={collection} />
                    </BasePagination>
                </TablePagelayout>
            </CentredLayout>
        </AppLayout>
    );
}

export default ShowManagerPage;
