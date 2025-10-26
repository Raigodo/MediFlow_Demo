import ErrorBoundary from '@/components/_shared/utility/error-boundary';
import { ResourceActionsItem } from '@/lib/types/models/reource-actions-item';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { DossierSectionLinks } from './dossier-section-links';

function DossierSectionContentShell({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <div
            className={cn(
                'border-primary ml-10 min-h-18 border-x px-4 pt-4 pb-6 shadow-md',
                className,
            )}
        >
            <ErrorBoundary>{children}</ErrorBoundary>
        </div>
    );
}

function DossierSectionHeaderShell({
    children,
    className,
    sections,
    messages,
}: {
    children: ReactNode;
    className?: string;
    sections?: Record<string, ResourceActionsItem>;
    messages?: Record<string, string>;
}) {
    return (
        <div className="relative">
            <div
                className={cn(
                    'flex flex-col',
                    'relative space-y-2 rounded-tr-md border-t border-r',
                    'border-primary border-l-6 px-4 py-2 shadow-sm',
                    className,
                )}
            >
                <ErrorBoundary>
                    {children}
                    {sections && <DossierSectionLinks sections={sections} messages={messages} />}
                </ErrorBoundary>
            </div>
        </div>
    );
}

function DossierSectionShell({
    className,
    children,
}: {
    className?: string;
    children?: ReactNode;
}) {
    return (
        <div className={cn('mt-14 ml-4', className)}>
            <ErrorBoundary>{children}</ErrorBoundary>
        </div>
    );
}

export { DossierSectionContentShell, DossierSectionHeaderShell, DossierSectionShell };
