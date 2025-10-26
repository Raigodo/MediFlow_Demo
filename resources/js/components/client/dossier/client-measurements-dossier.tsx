import { DossierLayout } from '@/components/_shared/dossier/dossier-layout';
import { DossierContentTable } from '@/components/_shared/dossier/dossier-main';
import MeasurementTable from '@/components/measurement/table/measurement-table';
import { ResourceSectionContextProvider } from '@/contexts/resource-sction-context';
import { usePagniatedMeasurements } from '@/lib/hooks/paginated/use-paginated-measurements';
import { ClientDetailResource } from '@/lib/types/models/client/client-resources';
import ClientDossierHeader from './shared/client-dossier-header';

function ClientMeasurementsDossier({ client }: { client: ClientDetailResource }) {
    const { collection, filter, ...rest } = usePagniatedMeasurements();

    return (
        <ResourceSectionContextProvider defaultSectionKey="measurements">
            <DossierLayout actions={{ title: 'Client', dropdown: client.actions.dropdown }}>
                <ClientDossierHeader client={client} />
                <DossierContentTable pagination={rest} paginationBag={filter}>
                    <MeasurementTable collection={collection} showPreview />
                </DossierContentTable>
            </DossierLayout>
        </ResourceSectionContextProvider>
    );
}

export default ClientMeasurementsDossier;
