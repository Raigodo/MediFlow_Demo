import { DossierLayout } from '@/components/_shared/dossier/dossier-layout';
import { DossierContentTable } from '@/components/_shared/dossier/dossier-main';
import ArchivedClientTable from '@/components/client/table/archived-client-table';
import { ResourceSectionContextProvider } from '@/contexts/resource-sction-context';
import { usePagniatedClients } from '@/lib/hooks/paginated/use-paginated-clients';
import { StructureDetailResource } from '@/lib/types/models/structure/structure-resources';
import StructureDossierHeader from './structure-dossier-header';

function StructureArchivedClientsDossier({ structure }: { structure: StructureDetailResource }) {
    const { collection, filter, ...rest } = usePagniatedClients();

    return (
        <ResourceSectionContextProvider defaultSectionKey="clients">
            <DossierLayout actions={{ title: 'Structure', dropdown: structure.actions.dropdown }}>
                <StructureDossierHeader structure={structure} />
                <DossierContentTable pagination={rest} paginationBag={filter}>
                    <ArchivedClientTable collection={collection} />
                </DossierContentTable>
            </DossierLayout>
        </ResourceSectionContextProvider>
    );
}

export default StructureArchivedClientsDossier;
