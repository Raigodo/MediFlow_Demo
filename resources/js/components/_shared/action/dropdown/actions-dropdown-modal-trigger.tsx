import { OpenModalFunctionProps, useModalManager } from '@/contexts/modal-manager-context';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { DropdownMenuItem } from '../../ui/dropdown-menu';
import ActionButton from '../base/action-button';

function ActionsDropdownModalTrigger({
    className,
    children,
    modal,
}: {
    className?: string;
    children?: ReactNode;
    modal: OpenModalFunctionProps;
}) {
    const { openModal } = useModalManager();

    return (
        <DropdownMenuItem asChild>
            <ActionButton
                variant="dropdown"
                onClick={() => openModal(modal)}
                className={cn('hover:cursor-pointer focus-visible:ring-0', className)}
            >
                {children}
            </ActionButton>
        </DropdownMenuItem>
    );
}

export default ActionsDropdownModalTrigger;
