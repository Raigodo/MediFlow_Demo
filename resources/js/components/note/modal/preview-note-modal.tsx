import PreviewModalDateField from '@/components/_shared/modal/variant/preview/field/preview-modal-date-field';
import PreviewModalEmployeeFieldLink from '@/components/_shared/modal/variant/preview/field/preview-modal-employee-field';
import PreviewModalPlainField from '@/components/_shared/modal/variant/preview/field/preview-modal-plain-field';
import PreviewModal from '@/components/_shared/modal/variant/preview/preview-modal-shell';
import { ScrollArea } from '@/components/_shared/ui/scroll-area';
import { textareaVariants } from '@/components/_shared/ui/textarea';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/_shared/ui/tooltip';
import { useLocalEnum } from '@/lib/hooks/locale/useLocalEnum';
import { NotePreviewResource } from '@/lib/types/models/note/note-resources';
import { ModalKey } from '@/lib/types/values/modal-key';
import { cn } from '@/lib/utils';
import { CircleAlertIcon } from 'lucide-react';
import Wrapper, { BaseModalComponentProps } from '../../_shared/modal/modal-wrapper';

const PreviewNoteModal = () => {
    return <Wrapper modalKey={ModalKey.PREVIEW_NOTE} modalComponent={ModalComponent} />;
};

export default PreviewNoteModal;

export interface PreviewNoteModalComponentProps extends BaseModalComponentProps {
    note: NotePreviewResource;
}

const ModalComponent = ({ isOpen, closeModal, note }: PreviewNoteModalComponentProps) => {
    const { employeeRole } = useLocalEnum();

    if (!note) {
        console.error('can not open modal because of invalid state');
        closeModal();
        return;
    }

    return (
        <PreviewModal
            title="Priekšskatīt dienas ierakstu"
            isOpen={isOpen}
            closeModal={closeModal}
            expandAction={note.actions.show}
            classNames={{ content: 'mb-0' }}
        >
            <PreviewModalEmployeeFieldLink label="Izveidoja" employee={note.data.creator} />
            <PreviewModalPlainField
                label="Amats"
                value={employeeRole(note.data.creator.data.role)}
            />
            <PreviewModalDateField label="Izveidots" value={note.data.createdAt} />

            <div className="relative mt-4">
                <div
                    className={cn(
                        textareaVariants(),
                        'h-fit max-h-64 min-h-32 resize-none rounded-md border px-0 text-lg shadow-lg focus-visible:ring-0',
                    )}
                >
                    <ScrollArea className="py-1 pr-10 pl-4">{note.data.content}</ScrollArea>
                </div>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <CircleAlertIcon
                                size={20}
                                className={cn(
                                    'text-secondary absolute top-2 right-3',
                                    note.data.isImportant && 'text-destructive',
                                )}
                            />
                        </TooltipTrigger>
                        <TooltipContent side={'top'}>
                            <p>
                                {note.data.isImportant
                                    ? 'Ieraksts ir atzīmēts kā svarīgs'
                                    : 'Ieraksts nav atzīmēts kā svarīgs'}
                            </p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </PreviewModal>
    );
};
