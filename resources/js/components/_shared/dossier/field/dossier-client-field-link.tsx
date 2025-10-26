import { ClientPreviewResource } from '@/lib/types/models/client/client-resources';
import { Link } from '@inertiajs/react';
import { Label } from '../../ui/label';
import { DossierFieldShell } from './dossier-field-shell';

function DossierClientFieldLink({
    client,
    label,
}: {
    client: ClientPreviewResource;
    label: string;
}) {
    return (
        <Link href={client.actions.show.url}>
            <DossierFieldShell className="hover:bg-muted">
                <Label>{label}</Label>
                {client.data.name} {client.data.surname}
            </DossierFieldShell>
        </Link>
    );
}

export default DossierClientFieldLink;
