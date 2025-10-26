import BatchSupplyMedicamentForm from '@/components/medicament/form/batch-supply-medicament-form';
import AppLayout from '@/layouts/app-layout';
import CentredLayout from '@/layouts/centred-layout';
import DossierPagelayout from '@/layouts/dossier-page-layout';

function IndexMedicamentPage() {
    return (
        <AppLayout
        // backStack={[
        //     { label: 'Medikamenti', href: routeTo.medicament.index().path },
        //     { label: 'Papildīnāt' },
        // ]}
        >
            <CentredLayout>
                <DossierPagelayout className="px-4">
                    <BatchSupplyMedicamentForm />
                </DossierPagelayout>
            </CentredLayout>
        </AppLayout>
    );
}

export default IndexMedicamentPage;
