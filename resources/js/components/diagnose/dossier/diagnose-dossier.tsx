import { DossierLayout } from '@/components/_shared/dossier/dossier-layout';
import { DossierContentShell, DossierHeader } from '@/components/_shared/dossier/dossier-main';
import DossierClientFieldLink from '@/components/_shared/dossier/field/dossier-client-field-link';
import DossierDateField from '@/components/_shared/dossier/field/dossier-date-field';
import DossierEmployeeFieldLink from '@/components/_shared/dossier/field/dossier-employee-field-link';
import DossierPlainField from '@/components/_shared/dossier/field/dossier-plain-field';
import { DiagnoseDetailResource } from '@/lib/types/models/diagnose/diagnose-resources';

function DiagnoseDossier({ diagnose }: { diagnose: DiagnoseDetailResource }) {
    return (
        <DossierLayout actions={{ title: 'Diagnozes', dropdown: diagnose.actions.dropdown }}>
            <DossierHeader title={'Diagnoze'} subtitle={diagnose.data.id} hideAvatar />
            <DossierContentShell>
                <DossierDateField label="Created At" value={diagnose.data.createdAt} />
                <DossierEmployeeFieldLink label="Autors" employee={diagnose.data.creator} />
                <DossierClientFieldLink label="Klients" client={diagnose.data.client} />
                <DossierPlainField label="Diagnoze" value={diagnose.data.name} />
                {diagnose.data.archivedOn && (
                    <DossierDateField label="Arhivēts" value={diagnose.data.archivedOn} />
                )}
            </DossierContentShell>
        </DossierLayout>
    );
}

export default DiagnoseDossier;
