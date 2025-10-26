import MedicamentDossier from '@/components/medicament/dossier/medicament-dossier';
import AppLayout from '@/layouts/app-layout';
import CentredLayout from '@/layouts/centred-layout';
import DossierPagelayout from '@/layouts/dossier-page-layout';
import { useSelectedMedicament } from '@/lib/hooks/selected/use-selected-medicament';

function ShowMedicamentPage() {
    const medicament = useSelectedMedicament();

    return (
        <AppLayout
        // backStack={[
        //     { label: 'Medikamenti', href: routeTo.medicament.index().path },
        //     { label: 'Skatīt' },
        // ]}
        >
            <CentredLayout>
                <DossierPagelayout>
                    <MedicamentDossier medicament={medicament} />
                </DossierPagelayout>
            </CentredLayout>
        </AppLayout>
    );
}

export default ShowMedicamentPage;
