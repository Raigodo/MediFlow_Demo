import { DossierLayout } from '@/components/_shared/dossier/dossier-layout';
import { DossierContentTable } from '@/components/_shared/dossier/dossier-main';
import DiagnoseTable from '@/components/diagnose/table/diagnose-table';
import { ResourceSectionContextProvider } from '@/contexts/resource-sction-context';
import { usePagniatedDiagnoses } from '@/lib/hooks/paginated/use-paginated-diagnoses';
import { ClientDetailResource } from '@/lib/types/models/client/client-resources';
import ClientDossierHeader from './shared/client-dossier-header';

function ClientDiagnosesDossier({ client }: { client: ClientDetailResource }) {
    const { collection, filter, ...rest } = usePagniatedDiagnoses();

    return (
        <ResourceSectionContextProvider defaultSectionKey="diagnoses">
            <DossierLayout actions={{ title: 'Client', dropdown: client.actions.dropdown }}>
                <ClientDossierHeader client={client} />
                <DossierContentTable pagination={rest} paginationBag={filter}>
                    <DiagnoseTable collection={collection} showPreview />
                </DossierContentTable>
            </DossierLayout>
        </ResourceSectionContextProvider>
    );
}

export default ClientDiagnosesDossier;
