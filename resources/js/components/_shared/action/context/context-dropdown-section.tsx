import { ReactNode } from 'react';
import { DropdownMenuLabel, DropdownMenuSeparator } from '../../ui/dropdown-menu';

function ContextDropdownSection({
    hideSeparator,
    children,
    title,
}: {
    hideSeparator?: boolean;
    children?: ReactNode;
    title?: string;
}) {
    return (
        <>
            {title && <DropdownMenuLabel>{title}</DropdownMenuLabel>}
            {!hideSeparator && <DropdownMenuSeparator />}
            {children}
        </>
    );
}

export default ContextDropdownSection;
