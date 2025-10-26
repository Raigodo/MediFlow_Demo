import ClientAmbulanceCallsDossier from '@/components/client/dossier/client-ambulance-calls-dossier';
import AppLayout from '@/layouts/app-layout';
import DossierPagelayout from '@/layouts/dossier-page-layout';
import { useSelectedClient } from '@/lib/hooks/selected/use-selected-client';

function EditAmbulanceCallPage() {
    const client = useSelectedClient();

    return (
        <AppLayout
        // backStack={[
        //     { label: 'Klients', href: routeTo.client.show({ client }).path },
        //     { label: 'Ātrās palīdzības izsaukumi' },
        // ]}
        //TODO
        >
            <DossierPagelayout>
                <ClientAmbulanceCallsDossier client={client} />
            </DossierPagelayout>
        </AppLayout>
    );
}

export default EditAmbulanceCallPage;
