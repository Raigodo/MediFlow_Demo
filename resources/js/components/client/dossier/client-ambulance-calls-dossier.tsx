import { DossierLayout } from '@/components/_shared/dossier/dossier-layout';
import { DossierContentTable } from '@/components/_shared/dossier/dossier-main';
import AmbulanceCallTable from '@/components/ambulance-call/table/ambulance-call-table';
import { ResourceSectionContextProvider } from '@/contexts/resource-sction-context';
import { usePagniatedAmbulanceCalls } from '@/lib/hooks/paginated/use-paginated-ambulance-calls';
import { ClientDetailResource } from '@/lib/types/models/client/client-resources';
import ClientDossierHeader from './shared/client-dossier-header';

function ClientAmbulanceCallsDossier({ client }: { client: ClientDetailResource }) {
    const { collection, filter, ...rest } = usePagniatedAmbulanceCalls();

    return (
        <ResourceSectionContextProvider defaultSectionKey="ambulanceCalls">
            <DossierLayout actions={{ title: 'Client', dropdown: client.actions.dropdown }}>
                <ClientDossierHeader client={client} />
                <DossierContentTable pagination={rest} paginationBag={filter}>
                    <AmbulanceCallTable collection={collection} showPreview />
                </DossierContentTable>
            </DossierLayout>
        </ResourceSectionContextProvider>
    );
}

export default ClientAmbulanceCallsDossier;
