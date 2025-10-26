import { ScrollArea } from '@/components/_shared/ui/scroll-area';
import ErrorBoundary from '@/components/_shared/utility/error-boundary';
import ClientSideTable from '@/components/client/table/client-side-table';
import { useClientSidelist } from '@/lib/hooks/sidelist/use-client-sidelist';
import { ReactNode } from 'react';

function SidebarClientsLayout({ children }: { children: ReactNode }) {
    const clientSidelist = useClientSidelist();

    if (!clientSidelist) return children;

    return (
        <div className="grid h-full grid-cols-[256px_1fr] grid-rows-1 overflow-hidden">
            <div className="border-border mr-1 grid grid-rows-[minmax(0,1fr)] border-r py-2 pl-1.5 shadow-md">
                <ScrollArea
                    className="h-full overflow-hidden border-l pl-0.5"
                    viewportClassName="[&>div]:!block h-full "
                >
                    <ClientSideTable />
                </ScrollArea>
            </div>

            <div className="grow overflow-y-auto">
                <ErrorBoundary>{children}</ErrorBoundary>
            </div>
        </div>
    );
}

export default SidebarClientsLayout;
