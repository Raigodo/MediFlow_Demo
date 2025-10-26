import NoteDossier from '@/components/note/dossier/note-dossier';
import AppLayout from '@/layouts/app-layout';
import DossierPagelayout from '@/layouts/dossier-page-layout';
import { useSelectedNote } from '@/lib/hooks/selected/use-selected-note';

function ShowNotePage() {
    const note = useSelectedNote();

    return (
        <AppLayout
        // backStack={[
        //     { label: 'Dienas ieraksti', href: routeTo.note.index({ client }).path },
        //     { label: 'Skatīt' },
        // ]}
        //TODO
        >
            <DossierPagelayout>
                <NoteDossier note={note} />
            </DossierPagelayout>
        </AppLayout>
    );
}

export default ShowNotePage;
