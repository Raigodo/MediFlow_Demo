import { ReactNode } from 'react';
import { ScrollArea } from '../../../ui/scroll-area';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '../../../ui/sheet';
import { BaseModalComponentProps } from '../../modal-wrapper';

interface FilterModalComponentProps extends BaseModalComponentProps {
    children: ReactNode;
    title?: string;
    description?: string;
}

function FilterModalComponent({
    children,
    title,
    description,
    isOpen,
    closeModal,
}: FilterModalComponentProps) {
    return (
        <Sheet open={isOpen} onOpenChange={(value) => value !== isOpen && !value && closeModal()}>
            <SheetContent className="grid grid-rows-[auto_minmax(0,1fr)]">
                <SheetHeader className="shadow-sm">
                    <SheetTitle>{title ?? 'Filtrēt'}</SheetTitle>
                    <SheetDescription>
                        {description ?? 'Atlasīt filtrācijas parametrus'}
                    </SheetDescription>
                </SheetHeader>

                <ScrollArea>{children}</ScrollArea>
            </SheetContent>
        </Sheet>
    );
}

export default FilterModalComponent;
