import { StructurePreviewResource } from '@/lib/types/models/structure/structure-resources';
import { Link } from '@inertiajs/react';
import { Label } from '../../ui/label';
import { DossierFieldShell } from './dossier-field-shell';

function DossierStructureFieldLink({
    structure,
    label,
}: {
    structure: StructurePreviewResource;
    label: string;
}) {
    return (
        <Link href={structure.actions.show.url}>
            <DossierFieldShell className="hover:bg-muted">
                <Label>{label}</Label>
                {structure.data.name}
            </DossierFieldShell>
        </Link>
    );
}

export default DossierStructureFieldLink;
