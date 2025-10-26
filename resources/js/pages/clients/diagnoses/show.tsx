import DiagnoseDossier from '@/components/diagnose/dossier/diagnose-dossier';
import AppLayout from '@/layouts/app-layout';
import DossierPagelayout from '@/layouts/dossier-page-layout';
import { useSelectedDiagnose } from '@/lib/hooks/selected/use-selected-diagnose';

function ShowDiagnosePage() {
    const diagnose = useSelectedDiagnose();

    return (
        <AppLayout
        // backStack={[
        //     { label: 'Klients', href: routeTo.client.show({ client }).path },
        //     { label: 'Diagnozes', href: routeTo.diagnose.index({ client }).path },
        //     { label: 'Skatīt' },
        // ]}
        //TODO
        >
            <DossierPagelayout>
                <DiagnoseDossier diagnose={diagnose} />
            </DossierPagelayout>
        </AppLayout>
    );
}

export default ShowDiagnosePage;
