import { DossierHeader } from '@/components/_shared/dossier/dossier-main';
import { ClientDetailResource } from '@/lib/types/models/client/client-resources';

function ClientDossierHeader({ client }: { client: ClientDetailResource }) {
    return (
        <DossierHeader
            title={`${client.data.name} ${client.data.surname}`}
            subtitle={client.data.id}
            iconUrl={client.data.avatarUrl}
            sections={client.data.sections}
        />
    );
}

export default ClientDossierHeader;
