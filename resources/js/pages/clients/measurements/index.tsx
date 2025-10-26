import ClientMeasurementsDossier from '@/components/client/dossier/client-measurements-dossier';
import AppLayout from '@/layouts/app-layout';
import DossierPagelayout from '@/layouts/dossier-page-layout';
import { useSelectedClient } from '@/lib/hooks/selected/use-selected-client';

function MeasurementsPage() {
    const client = useSelectedClient();

    return (
        <AppLayout
        // backStack={[
        //     { label: 'Klients', href: routeTo.client.show({ client }).path },
        //     { label: 'Mērījumi', href: routeTo.measurement.index({ client }).path },
        // ]}
        //TODO
        >
            <DossierPagelayout>
                <ClientMeasurementsDossier client={client} />
            </DossierPagelayout>
        </AppLayout>
    );
}

export default MeasurementsPage;
