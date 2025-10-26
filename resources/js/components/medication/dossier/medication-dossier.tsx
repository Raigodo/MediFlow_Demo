import { DossierLayout } from '@/components/_shared/dossier/dossier-layout';
import { DossierContentShell, DossierHeader } from '@/components/_shared/dossier/dossier-main';
import DossierClientFieldLink from '@/components/_shared/dossier/field/dossier-client-field-link';
import DossierDateField from '@/components/_shared/dossier/field/dossier-date-field';
import DossierEmployeeFieldLink from '@/components/_shared/dossier/field/dossier-employee-field-link';
import DossierPlainField from '@/components/_shared/dossier/field/dossier-plain-field';
import { MedicationDetailResource } from '@/lib/types/models/medication/medication-resources';

function MedicationDossier({ medication }: { medication: MedicationDetailResource }) {
    return (
        <DossierLayout actions={{ title: 'Medication', dropdown: medication.actions.dropdown }}>
            <DossierHeader title={'Medication'} subtitle={medication.data.id} hideAvatar />
            <DossierContentShell>
                <DossierDateField label="Created At" value={medication.data.createdAt} />
                <DossierEmployeeFieldLink label="Autors" employee={medication.data.creator} />
                <DossierClientFieldLink label="Klients" client={medication.data.client} />
                <DossierPlainField
                    label="Medikaments"
                    value={medication.data.medicament.data.medicamentType.data.name}
                />
                <DossierPlainField
                    label="Apjoms"
                    value={medication.data.amount}
                    postfix={medication.data.medicament.data.medicamentType.data.form}
                />
            </DossierContentShell>
        </DossierLayout>
    );
}

export default MedicationDossier;
