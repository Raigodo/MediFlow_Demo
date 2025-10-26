import ErrorBoundary from '@/components/_shared/utility/error-boundary';
import { ResourceActionsItem } from '@/lib/types/models/reource-actions-item';
import { cn } from '@/lib/utils';
import { FC, ReactNode } from 'react';
import { NavSectionLinks } from '../action/nav/nav-section-links';
import BasePagination, { BasePaginationProps } from '../table/pagination';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

function DossierContentShell({ children, className }: { children: ReactNode; className?: string }) {
    return (
        <div
            className={cn(
                'border-primary mb-6 ml-14 min-h-[300px] border-x px-4 pt-4 pb-6 shadow-lg',
                className,
            )}
        >
            <ErrorBoundary>{children}</ErrorBoundary>
        </div>
    );
}

function DossierContentTable({
    children,
    className,
    pagination,
    paginationBag,
}: { children: ReactNode; className?: string } & BasePaginationProps) {
    return (
        <DossierContentShell className={cn('pb-0', className)}>
            <BasePagination pagination={pagination} paginationBag={paginationBag} className="px-0">
                {children}
            </BasePagination>
        </DossierContentShell>
    );
}

function DossierHeaderShell({ children, className }: { children: ReactNode; className?: string }) {
    return (
        <div
            className={cn(
                'rounded-tr-lg border-t border-r shadow-sm',
                'border-primary border-l-8',
                'relative px-4 py-2',
                className,
            )}
        >
            <ErrorBoundary>{children}</ErrorBoundary>
        </div>
    );
}

export type DossierHeaderProps = {
    iconUrl?: string;
    hideAvatar?: boolean;
    renderAvatar?: FC;
    title?: string | ReactNode;
    subtitle?: string | ReactNode;
    sections?: Record<string, ResourceActionsItem>;
    className?: string;
};

function DossierHeader({
    hideAvatar = false,
    renderAvatar: RenderAvatar,
    iconUrl,
    title,
    subtitle,
    sections,
    className,
}: DossierHeaderProps) {
    return (
        <DossierHeaderShell>
            <div
                className={cn(
                    'grid grid-rows-[auto_1fr] space-y-3 gap-x-8 overflow-x-auto',
                    className,
                )}
            >
                <div className="flex gap-x-4">
                    {!hideAvatar && RenderAvatar && <RenderAvatar />}
                    {!hideAvatar && !RenderAvatar && iconUrl && (
                        <Avatar>
                            <AvatarImage src={iconUrl} alt="icon" />
                            <AvatarFallback>IC</AvatarFallback>
                        </Avatar>
                    )}
                    <div>
                        <h1 className="text-2xl">{title ?? 'no structure'}</h1>
                        {subtitle && <h3 className="text-secondary text-sm">{subtitle}</h3>}
                    </div>
                </div>

                {sections && (
                    <NavSectionLinks
                        sections={sections}
                        className="mb-1.5"
                        classNames={{ item: 'grow-0' }}
                    />
                )}
            </div>
        </DossierHeaderShell>
    );
}

export { DossierContentShell, DossierContentTable, DossierHeader, DossierHeaderShell };
