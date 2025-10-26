import ClientDiagnosesDossier from '@/components/client/dossier/client-diagnoses-dossier';
import AppLayout from '@/layouts/app-layout';
import DossierPagelayout from '@/layouts/dossier-page-layout';
import { useSelectedClient } from '@/lib/hooks/selected/use-selected-client';

function DiagnosesPage() {
    const client = useSelectedClient();

    return (
        <AppLayout
        // backStack={[
        //     { label: 'Klients', href: routeTo.client.show({ client }).path },
        //     { label: 'Diagnozes' },
        // ]}
        //TODO
        >
            <DossierPagelayout>
                <ClientDiagnosesDossier client={client} />
            </DossierPagelayout>
        </AppLayout>
    );
}

export default DiagnosesPage;
