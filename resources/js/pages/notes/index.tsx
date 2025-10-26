import BasePagination from '@/components/_shared/table/pagination';
import NoteTable from '@/components/note/table/note-table';
import AppLayout from '@/layouts/app-layout';
import CentredLayout from '@/layouts/centred-layout';
import TablePagelayout from '@/layouts/table-page-layout';
import { usePagniatedNotes } from '@/lib/hooks/paginated/use-paginated-notes';

function JournalIndexPage() {
    const { filter, collection, ...rest } = usePagniatedNotes();

    return (
        <AppLayout
        //backStack={[{ label: 'Dienas Ieraksti' }]}
        //TODO
        >
            <CentredLayout>
                <TablePagelayout>
                    <BasePagination className="min-h-full" pagination={rest} paginationBag={filter}>
                        <NoteTable collection={collection} showPreview />
                    </BasePagination>
                </TablePagelayout>
            </CentredLayout>
        </AppLayout>
    );
}

export default JournalIndexPage;
