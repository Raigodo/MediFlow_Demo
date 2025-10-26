import BasePagination from '@/components/_shared/table/pagination';
import MedicamentTable from '@/components/medicament/table/medicament-table';
import AppLayout from '@/layouts/app-layout';
import CentredLayout from '@/layouts/centred-layout';
import TablePagelayout from '@/layouts/table-page-layout';
import { usePagniatedMedicaments } from '@/lib/hooks/paginated/use-paginated-medicaments';

function IndexMedicamentPage() {
    const { collection, filter, ...rest } = usePagniatedMedicaments();

    return (
        <AppLayout
        // backStack={[{ label: 'Medikamenti' }]}
        >
            <CentredLayout>
                <TablePagelayout>
                    <BasePagination className="min-h-full" pagination={rest} paginationBag={filter}>
                        <MedicamentTable collection={collection} />
                    </BasePagination>
                </TablePagelayout>
            </CentredLayout>
        </AppLayout>
    );
}

export default IndexMedicamentPage;
