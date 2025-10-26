import EditClientForm from '@/components/client/form/edit-client-form';
import AppLayout from '@/layouts/app-layout';
import DossierPagelayout from '@/layouts/dossier-page-layout';
import { useSelectedClient } from '@/lib/hooks/selected/use-selected-client';

function EditClientPage() {
    const client = useSelectedClient();

    return (
        <AppLayout
        // backStack={[
        //     { label: 'Klients', href: routeTo.client.show({ client }).path },
        //     { label: 'Rediģēt' },
        // ]}
        //TODO
        >
            <DossierPagelayout>
                <EditClientForm client={client} />
            </DossierPagelayout>
        </AppLayout>
    );
}

export default EditClientPage;
