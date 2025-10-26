import AppLayout from '@/layouts/app-layout';
import DossierPagelayout from '@/layouts/dossier-page-layout';

function PromptClientPage() {
    return (
        <AppLayout
        // backStack={[{ label: 'Klienta izvēlne' }]}
        //TODO
        >
            <DossierPagelayout>No Client Selected</DossierPagelayout>
        </AppLayout>
    );
}

export default PromptClientPage;
