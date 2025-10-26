import { ResourceActionsItem } from '@/lib/types/models/reource-actions-item';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { ContextMenuItem } from '../../ui/context-menu';
import ActionLink from '../base/action-link';

function ContextDropdownLink({
    className,
    children,
    action,
}: {
    className?: string;
    children: ReactNode;
    action: ResourceActionsItem;
}) {
    return (
        <ContextMenuItem
            asChild
            className={cn('hover:cursor-pointer focus-visible:ring-0', className)}
        >
            <ActionLink variant="dropdown" action={action}>
                {children}
            </ActionLink>
        </ContextMenuItem>
    );
}

export default ContextDropdownLink;
