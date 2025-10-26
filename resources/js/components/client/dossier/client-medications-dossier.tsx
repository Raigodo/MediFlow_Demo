import { DossierLayout } from '@/components/_shared/dossier/dossier-layout';
import { DossierContentTable } from '@/components/_shared/dossier/dossier-main';
import MedicationTable from '@/components/medication/table/medication-table';
import { ResourceSectionContextProvider } from '@/contexts/resource-sction-context';
import { usePagniatedMedications } from '@/lib/hooks/paginated/use-paginated-medications';
import { ClientDetailResource } from '@/lib/types/models/client/client-resources';
import ClientDossierHeader from './shared/client-dossier-header';

function ClientMedicationsDossier({ client }: { client: ClientDetailResource }) {
    const { collection, filter, ...rest } = usePagniatedMedications();

    return (
        <ResourceSectionContextProvider defaultSectionKey="medications">
            <DossierLayout actions={{ title: 'Client', dropdown: client.actions.dropdown }}>
                <ClientDossierHeader client={client} />
                <DossierContentTable pagination={rest} paginationBag={filter}>
                    <MedicationTable collection={collection} showPreview />
                </DossierContentTable>
            </DossierLayout>
        </ResourceSectionContextProvider>
    );
}

export default ClientMedicationsDossier;
