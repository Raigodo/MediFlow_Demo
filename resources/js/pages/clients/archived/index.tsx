import StructureArchivedClientsDossier from '@/components/structure/dossier/structure-archived-clients-dossier';
import AppLayout from '@/layouts/app-layout';
import CentredLayout from '@/layouts/centred-layout';
import DossierPagelayout from '@/layouts/dossier-page-layout';
import { useCurrentStructure } from '@/lib/hooks/current/use-current-structure';

function ArchivedClientIndex() {
    const structure = useCurrentStructure();

    if (!structure) throw Error('can not proceed (no user | structure)');

    return (
        <AppLayout
        // backStack={[
        //     { label: 'Struktūrvienības', href: routeTo.structure.index({ user }).path },
        //     { label: 'Skatīt', href: routeTo.structure.show({ structure }).path },
        //     { label: 'Arhivētie klienti' },
        // ]}
        >
            <CentredLayout>
                <DossierPagelayout>
                    <StructureArchivedClientsDossier structure={structure} />
                </DossierPagelayout>
            </CentredLayout>
        </AppLayout>
    );
}

export default ArchivedClientIndex;
