import { DossierLayout } from '@/components/_shared/dossier/dossier-layout';
import { DossierContentShell } from '@/components/_shared/dossier/dossier-main';
import DossierDateField from '@/components/_shared/dossier/field/dossier-date-field';
import DossierEmployeeFieldLink from '@/components/_shared/dossier/field/dossier-employee-field-link';
import DossierUserFieldLink from '@/components/_shared/dossier/field/dossier-user-field-link';
import { ResourceSectionContextProvider } from '@/contexts/resource-sction-context';
import { StructureDetailResource } from '@/lib/types/models/structure/structure-resources';
import StructureDossierHeader from './structure-dossier-header';

function StructureDossier({ structure }: { structure: StructureDetailResource }) {
    return (
        <ResourceSectionContextProvider defaultSectionKey="baseData">
            <DossierLayout actions={{ title: 'Structure', dropdown: structure.actions.dropdown }}>
                <StructureDossierHeader structure={structure} />
                <DossierContentShell>
                    <DossierDateField label="Izveidots" value={structure.data.createdAt} />
                    <DossierUserFieldLink
                        label="Vadītājs"
                        user={structure.data.managers.data[0].data.user}
                    />
                    <DossierEmployeeFieldLink
                        label="Atbildīgais par medikamentiem"
                        employee={structure.data.medicamentManager}
                    />
                </DossierContentShell>
            </DossierLayout>
        </ResourceSectionContextProvider>
    );
}

export default StructureDossier;
