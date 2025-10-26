import { BaseFormProps } from '@/components/_shared/form/base-form-props';
import { useSelectedClient } from '@/lib/hooks/selected/use-selected-client';
import { useNoteToWrite } from '@/lib/hooks/selected/use-selected-note';
import BaseWriteNoteForm from './base-write-note-form';

type WriteNoteFormProps = BaseFormProps;

function WriteNoteForm(props: WriteNoteFormProps) {
    const client = useSelectedClient();
    const note = useNoteToWrite();

    if (!client) throw Error('can not preceed (No Client selected)');

    return (
        <BaseWriteNoteForm
            {...props}
            submitAction={client.actions.storeNote}
            deleteAction={'destroy' in note.actions ? note.actions.destroy : undefined}
        />
    );
}

export default WriteNoteForm;
