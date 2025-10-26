import ErrorBoundary from '@/components/_shared/utility/error-boundary';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

function TablePagelayout({ children, className }: { children: ReactNode; className?: string }) {
    return (
        <div className={cn('h-[calc(100%-8px)]', className)}>
            <div className="mx-2 mt-2 grid h-fit min-h-full grid-rows-[1fr] border border-b-0">
                <ErrorBoundary>{children}</ErrorBoundary>
            </div>
        </div>
    );
}

export default TablePagelayout;
