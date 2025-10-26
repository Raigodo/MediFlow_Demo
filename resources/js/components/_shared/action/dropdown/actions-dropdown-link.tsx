import { ResourceActionsItem } from '@/lib/types/models/reource-actions-item';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { DropdownMenuItem } from '../../ui/dropdown-menu';
import ActionLink from '../base/action-link';

function ActionsDropdownLink({
    className,
    children,
    action,
}: {
    className?: string;
    children: ReactNode;
    action: ResourceActionsItem;
}) {
    return (
        <DropdownMenuItem
            asChild
            className={cn('hover:cursor-pointer focus-visible:ring-0', className)}
        >
            <ActionLink variant="dropdown" action={action}>
                {children}
            </ActionLink>
        </DropdownMenuItem>
    );
}

export default ActionsDropdownLink;
