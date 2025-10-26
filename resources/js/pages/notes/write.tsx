import WriteNoteForm from '@/components/note/form/write-note-form';
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
                <WriteNoteForm />
            </DossierPagelayout>
        </AppLayout>
    );
}

export default WriteNotePage;
