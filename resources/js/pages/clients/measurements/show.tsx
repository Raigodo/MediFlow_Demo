import MeasurementDossier from '@/components/measurement/dossier/measurement-dossier';
import AppLayout from '@/layouts/app-layout';
import DossierPagelayout from '@/layouts/dossier-page-layout';
import { useSelectedMeasurement } from '@/lib/hooks/selected/use-selected-measurement';

function ShowMeasurementPage() {
    const measurement = useSelectedMeasurement();

    return (
        <AppLayout
        // backStack={[
        //     { label: 'Klients', href: routeTo.client.show({ client }).path },
        //     { label: 'Mērījumi', href: routeTo.measurement.index({ client }).path },
        //     { label: 'Skatīt' },
        // ]}
        //TODO
        >
            <DossierPagelayout>
                <MeasurementDossier measurement={measurement} />
            </DossierPagelayout>
        </AppLayout>
    );
}

export default ShowMeasurementPage;
