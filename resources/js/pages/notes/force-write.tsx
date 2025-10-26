import ForceWriteNoteForm from '@/components/note/form/force-write-note-form';
import AppLayout from '@/layouts/app-layout';
import DossierPagelayout from '@/layouts/dossier-page-layout';

function WriteNotePage() {
    return (
        <AppLayout
        // backStack={[
        //     { label: 'Dienas ieraksti', href: routeTo.note.index({ client }).path },
        //     { label: 'Rakstīt' },
        // ]}
        //TODO
        >
            <DossierPagelayout>
                <ForceWriteNoteForm />
            </DossierPagelayout>
        </AppLayout>
    );
}

export default WriteNotePage;
