import ClientMedicationsDossier from '@/components/client/dossier/client-medications-dossier';
import AppLayout from '@/layouts/app-layout';
import DossierPagelayout from '@/layouts/dossier-page-layout';
import { useSelectedClient } from '@/lib/hooks/selected/use-selected-client';

function MedicationsPage() {
    const client = useSelectedClient();

    return (
        <AppLayout
        // backStack={[
        //     { label: 'Klients', href: routeTo.client.show({ client }).path },
        //     {
        //         label: 'Izsniegtie medikamenti',
        //         href: routeTo.medication.index({ client }).path,
        //     },
        // ]}
        //TODO
        >
            <DossierPagelayout>
                <ClientMedicationsDossier client={client} />
            </DossierPagelayout>
        </AppLayout>
    );
}

export default MedicationsPage;
