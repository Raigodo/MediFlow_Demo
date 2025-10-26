import ClientDossier from '@/components/client/dossier/client-dossier';
import AppLayout from '@/layouts/app-layout';
import DossierPagelayout from '@/layouts/dossier-page-layout';
import { useSelectedClient } from '@/lib/hooks/selected/use-selected-client';

function ShowClientPage() {
    const client = useSelectedClient();

    return (
        <AppLayout
        // backStack={[{ label: 'Klients' }]}
        //TODO
        >
            <DossierPagelayout>
                <ClientDossier client={client} />
            </DossierPagelayout>
        </AppLayout>
    );
}

export default ShowClientPage;
