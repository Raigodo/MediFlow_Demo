import { ResourceActionsItem } from '@/lib/types/models/reource-actions-item';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { ContextMenuItem } from '../../ui/context-menu';
import InlineForm from '../inline-form';

function ContextDropdownInlineForm({
    className,
    children,
    action,
}: {
    className?: string;
    children?: ReactNode;
    action: ResourceActionsItem;
}) {
    return (
        <ContextMenuItem
            asChild
            className={cn('hover:cursor-pointer focus-visible:ring-0', className)}
        >
            <InlineForm variant="dropdown" action={action}>
                {children}
            </InlineForm>
        </ContextMenuItem>
    );
}

export default ContextDropdownInlineForm;
