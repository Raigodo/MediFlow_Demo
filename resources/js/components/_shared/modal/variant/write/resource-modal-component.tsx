import { ReactNode } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '../../../ui/dialog';
import { ScrollArea } from '../../../ui/scroll-area';
import { BaseModalComponentProps } from '../../modal-wrapper';

interface ResourceModalComponentProps extends BaseModalComponentProps {
    children: ReactNode;
    title: string;
    description?: string;
}

function ResourceModalComponent({
    isOpen,
    closeModal,
    children,
    title,
    description,
}: ResourceModalComponentProps) {
    return (
        <Dialog open={isOpen} onOpenChange={(value) => value !== isOpen && !value && closeModal()}>
            <DialogContent className="grid max-h-[500px] grid-rows-[auto_minmax(0,1fr)] px-4">
                <DialogHeader className="px-2">
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>

                <ScrollArea className="mt-2 px-3">{children}</ScrollArea>
            </DialogContent>
        </Dialog>
    );
}

export default ResourceModalComponent;
