import { ResourceActionsItem } from '@/lib/types/models/reource-actions-item';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '../../../ui/dialog';
import { BaseModalComponentProps } from '../../modal-wrapper';
import ExpandPreviewLink from './expand-preview-link';

interface PreviewModalProps extends BaseModalComponentProps {
    title: string;
    description?: string;
    children: ReactNode;
    expandAction: ResourceActionsItem;
    classNames?: { expandLink?: string; content?: string };
}

function PreviewModal({
    isOpen,
    closeModal,
    title,
    description,
    children,
    expandAction: action,
    classNames,
}: PreviewModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={(value) => value !== isOpen && !value && closeModal()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>

                <div className={cn('mb-6', classNames?.content)}>{children}</div>

                <div
                    className={cn(
                        'bg-background absolute right-10 -bottom-2.5 size-11 rounded-md',
                        classNames?.expandLink,
                    )}
                >
                    <ExpandPreviewLink action={action} />
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default PreviewModal;
