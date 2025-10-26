import ErrorBoundary from '@/components/_shared/utility/error-boundary';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

function DossierPagelayout({ children, className }: { children: ReactNode; className?: string }) {
    return (
        <div className={cn('p-4 pl-2', className)}>
            <ErrorBoundary>{children}</ErrorBoundary>
        </div>
    );
}

export default DossierPagelayout;
