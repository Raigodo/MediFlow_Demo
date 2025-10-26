import { DossierHeader } from '@/components/_shared/dossier/dossier-main';
import { useCurrentUser } from '@/lib/hooks/current/use-current-user';
import { StructureDetailResource } from '@/lib/types/models/structure/structure-resources';

function StructureDossierHeader({ structure }: { structure: StructureDetailResource }) {
    const user = useCurrentUser();

    if (!user) throw Error('can not preceed (no user)');

    return (
        <DossierHeader
            title={structure.data.name}
            subtitle={structure.data.id}
            iconUrl={structure.data.iconUrl}
            sections={structure.data.sections}
        />
    );
}

export default StructureDossierHeader;
