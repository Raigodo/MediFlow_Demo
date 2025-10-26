import AppLayout from '@/layouts/app-layout';
import CentredLayout from '@/layouts/centred-layout';
import DossierPagelayout from '@/layouts/dossier-page-layout';

function NoStructurePage() {
    return (
        <AppLayout
        // backStack={[{ label: 'nav Struktūras' }]}
        >
            <CentredLayout>
                <DossierPagelayout>
                    <div>No Structure</div>
                </DossierPagelayout>
            </CentredLayout>
        </AppLayout>
    );
}

export default NoStructurePage;
