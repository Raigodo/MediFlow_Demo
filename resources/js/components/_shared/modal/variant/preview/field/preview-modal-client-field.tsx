import { Label } from '@/components/_shared/ui/label';
import { ClientPreviewResource } from '@/lib/types/models/client/client-resources';
import { Link } from '@inertiajs/react';
import PreviewModalField from './preview-modal-field';

function PreviewModalClientFieldLink({
    client,
    label,
}: {
    client: ClientPreviewResource;
    label: string;
}) {
    return (
        <Link href={client.actions.show.url}>
            <PreviewModalField className="hover:bg-muted">
                <Label>{label}</Label>
                {client.data.name} {client.data.surname}
            </PreviewModalField>
        </Link>
    );
}

export default PreviewModalClientFieldLink;
