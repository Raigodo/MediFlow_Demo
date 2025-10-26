import { DossierLayout } from '@/components/_shared/dossier/dossier-layout';
import { DossierContentTable } from '@/components/_shared/dossier/dossier-main';
import InvitationsTable from '@/components/invitation/table/invitation-table';
import { ResourceSectionContextProvider } from '@/contexts/resource-sction-context';
import { usePagniatedInvitations } from '@/lib/hooks/paginated/use-paginated-invitations';
import { StructureDetailResource } from '@/lib/types/models/structure/structure-resources';
import StructureDossierHeader from './structure-dossier-header';

function StructureInvitationDossier({ structure }: { structure: StructureDetailResource }) {
    const { collection, filter, ...rest } = usePagniatedInvitations();

    return (
        <ResourceSectionContextProvider defaultSectionKey="invitations">
            <DossierLayout actions={{ title: 'Structure', dropdown: structure.actions.dropdown }}>
                <StructureDossierHeader structure={structure} />
                <DossierContentTable pagination={rest} paginationBag={filter}>
                    <InvitationsTable collection={collection} />
                </DossierContentTable>
            </DossierLayout>
        </ResourceSectionContextProvider>
    );
}

export default StructureInvitationDossier;
