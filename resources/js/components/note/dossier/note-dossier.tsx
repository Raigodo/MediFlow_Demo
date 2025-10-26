import { DossierLayout } from '@/components/_shared/dossier/dossier-layout';
import { DossierContentShell, DossierHeader } from '@/components/_shared/dossier/dossier-main';
import DossierClientFieldLink from '@/components/_shared/dossier/field/dossier-client-field-link';
import DossierDateField from '@/components/_shared/dossier/field/dossier-date-field';
import DossierEmployeeFieldLink from '@/components/_shared/dossier/field/dossier-employee-field-link';
import DossierPlainField from '@/components/_shared/dossier/field/dossier-plain-field';
import DossierTextareaField from '@/components/_shared/dossier/field/dossier-textarea-field';
import { ResourceSectionContextProvider } from '@/contexts/resource-sction-context';
import { useLocalEnum } from '@/lib/hooks/locale/useLocalEnum';
import { NoteDetailResource } from '@/lib/types/models/note/note-resources';
import NoteDossierSection from './note-dossier-section';

function NoteDossier({ note }: { note: NoteDetailResource }) {
    const { employeeRole } = useLocalEnum();

    return (
        <ResourceSectionContextProvider>
            <DossierLayout actions={{ title: 'Note', dropdown: note.actions.dropdown }}>
                <DossierHeader title={'Dienas Ieraksts'} subtitle={note.data.id} hideAvatar />
                <DossierContentShell>
                    <DossierEmployeeFieldLink label="Autors" employee={note.data.creator} />
                    <DossierClientFieldLink label="Klients" client={note.data.client} />
                    <DossierPlainField
                        label="Amats"
                        value={employeeRole(note.data.creator.data.role)}
                    />
                    <DossierDateField label="Datums" value={note.data.createdAt} />
                    <DossierTextareaField label="Note Content" value={note.data.content ?? ''} />
                </DossierContentShell>
                <NoteDossierSection note={note} />
            </DossierLayout>
        </ResourceSectionContextProvider>
    );
}

export default NoteDossier;
