import AmbulanceCallDossier from '@/components/ambulance-call/dossier/ambulance-call-dossier';
import AppLayout from '@/layouts/app-layout';
import DossierPagelayout from '@/layouts/dossier-page-layout';
import { useSelectedAmbulanceCall } from '@/lib/hooks/selected/use-selected-ambulance-call';

function ShowAmbulanceCallPage() {
    const ambulanceCall = useSelectedAmbulanceCall();

    return (
        <AppLayout
        // backStack={[
        //     { label: 'Klients', href: routeTo.client.show({ client }).path },
        //     {
        //         label: 'Ātrās palīdzības izsaukumi',
        //         href: routeTo.ambulanceCall.index({ client }).path,
        //     },
        //     { label: 'Skatīt' },
        // ]}
        //TODO
        >
            <DossierPagelayout>
                <AmbulanceCallDossier ambulanceCall={ambulanceCall} />
            </DossierPagelayout>
        </AppLayout>
    );
}

export default ShowAmbulanceCallPage;
