import { BaseFormProps } from '@/components/_shared/form/base-form-props';
import { useSelectedNote } from '@/lib/hooks/selected/use-selected-note';
import BaseWriteNoteForm from './base-write-note-form';

type WriteNoteFormProps = BaseFormProps;

function WriteNoteForm(props: WriteNoteFormProps) {
    const note = useSelectedNote();

    return (
        <BaseWriteNoteForm
            {...props}
            submitAction={note.actions.forceUpdate}
            deleteAction={note.actions.destroy}
        />
    );
}

export default WriteNoteForm;
