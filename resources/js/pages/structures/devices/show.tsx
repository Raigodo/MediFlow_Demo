import DeviceDossier from '@/components/trusted-device/dossier/device-dossier';
import AppLayout from '@/layouts/app-layout';
import CentredLayout from '@/layouts/centred-layout';
import DossierPagelayout from '@/layouts/dossier-page-layout';
import { useCurrentStructure } from '@/lib/hooks/current/use-current-structure';
import { useCurrentUser } from '@/lib/hooks/current/use-current-user';
import { useSelectedDevice } from '@/lib/hooks/selected/use-selected-device';

function ShowTrustedDevicePage() {
    const device = useSelectedDevice();
    const user = useCurrentUser();
    const structure = useCurrentStructure();

    if (!user || !structure) throw Error('can not proceed (no user | structure)');

    return (
        <AppLayout
        // backStack={[
        //     { label: 'Struktūrvienības', href: routeTo.structure.index({ user }).path },
        //     { label: 'Skatīt', href: routeTo.structure.show({ structure }).path },
        //     { label: 'Trusted devices', href: routeTo.trustedDevice.index({ structure }).path },
        //     { label: 'Skatīt' },
        // ]}
        >
            <CentredLayout>
                <DossierPagelayout>
                    <DeviceDossier device={device} />
                </DossierPagelayout>
            </CentredLayout>
        </AppLayout>
    );
}

export default ShowTrustedDevicePage;
