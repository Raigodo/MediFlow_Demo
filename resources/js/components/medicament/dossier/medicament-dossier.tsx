import { DossierLayout } from '@/components/_shared/dossier/dossier-layout';
import { DossierContentShell, DossierHeader } from '@/components/_shared/dossier/dossier-main';
import DossierPlainField from '@/components/_shared/dossier/field/dossier-plain-field';
import { MedicamentDetailResource } from '@/lib/types/models/medicament/medicament-resources';

function MedicamentDossier({ medicament }: { medicament: MedicamentDetailResource }) {
    return (
        <DossierLayout actions={{ title: 'Medicament', dropdown: medicament.actions.dropdown }}>
            <DossierHeader title="Medikaments" subtitle={medicament.data.id} hideAvatar />
            <DossierContentShell>
                <DossierPlainField
                    label="Nosaukums"
                    value={medicament.data.medicamentType.data.name}
                />
                <DossierPlainField
                    label="Daudzums"
                    value={medicament.data.amount}
                    postfix={medicament.data.medicamentType.data.form}
                />
            </DossierContentShell>
        </DossierLayout>
    );
}

export default MedicamentDossier;
