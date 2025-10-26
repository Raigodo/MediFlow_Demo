import { ResourceActionsItem } from '@/lib/types/models/reource-actions-item';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { DropdownMenuItem } from '../../ui/dropdown-menu';
import InlineForm from '../inline-form';

function ActionsDropdownInlineForm({
    className,
    children,
    action,
}: {
    className?: string;
    children?: ReactNode;
    action: ResourceActionsItem;
}) {
    return (
        <DropdownMenuItem
            asChild
            className={cn('hover:cursor-pointer focus-visible:ring-0', className)}
        >
            <InlineForm variant="dropdown" action={action}>
                {children}
            </InlineForm>
        </DropdownMenuItem>
    );
}

export default ActionsDropdownInlineForm;
