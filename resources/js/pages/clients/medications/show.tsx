import MedicationDossier from '@/components/medication/dossier/medication-dossier';
import AppLayout from '@/layouts/app-layout';
import DossierPagelayout from '@/layouts/dossier-page-layout';
import { useSelectedMedication } from '@/lib/hooks/selected/use-selected-medication';

function ShowMedicationPage() {
    const medication = useSelectedMedication();

    return (
        <AppLayout
        // backStack={[
        //     { label: 'Klients', href: routeTo.client.show({ client }).path },
        //     {
        //         label: 'Izsniegtie medikamenti',
        //         href: routeTo.medication.index({ client }).path,
        //     },
        //     { label: 'Skatīt' },
        // ]}
        //TODO
        >
            <DossierPagelayout>
                <MedicationDossier medication={medication} />
            </DossierPagelayout>
        </AppLayout>
    );
}

export default ShowMedicationPage;
