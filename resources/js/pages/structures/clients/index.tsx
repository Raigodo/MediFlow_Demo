import StructureClientsDossier from '@/components/structure/dossier/structure-clients-dossier';
import AppLayout from '@/layouts/app-layout';
import CentredLayout from '@/layouts/centred-layout';
import DossierPagelayout from '@/layouts/dossier-page-layout';
import { useCurrentStructure } from '@/lib/hooks/current/use-current-structure';
import { useCurrentUser } from '@/lib/hooks/current/use-current-user';

function StructureClientsIndexPage() {
    const user = useCurrentUser();
    const structure = useCurrentStructure();

    if (!user || !structure) throw Error('can not proceed (no user | structure)');

    return (
        <AppLayout
        // backStack={[
        //     { label: 'Struktūrvienības', href: routeTo.structure.index({ user }).path },
        //     { label: 'Skatīt', href: routeTo.structure.show({ structure }).path },
        //     { label: 'Klienti' },
        // ]}
        >
            <CentredLayout>
                <DossierPagelayout>
                    <StructureClientsDossier structure={structure} />
                </DossierPagelayout>
            </CentredLayout>
        </AppLayout>
    );
}

export default StructureClientsIndexPage;
