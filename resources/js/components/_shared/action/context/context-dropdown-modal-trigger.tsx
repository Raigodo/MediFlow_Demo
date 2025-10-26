import { OpenModalFunctionProps, useModalManager } from '@/contexts/modal-manager-context';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import ActionButton from '../../../../components/_shared/action/base/action-button';
import { DropdownMenuItem } from '../../ui/dropdown-menu';

function ContextDropdownModalTrigger({
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

export default ContextDropdownModalTrigger;
