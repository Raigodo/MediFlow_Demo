import { DossierLayout } from '@/components/_shared/dossier/dossier-layout';
import { DossierContentShell, DossierHeader } from '@/components/_shared/dossier/dossier-main';
import DossierDateField from '@/components/_shared/dossier/field/dossier-date-field';
import DossierEmployeeFieldLink from '@/components/_shared/dossier/field/dossier-employee-field-link';
import DossierPlainField from '@/components/_shared/dossier/field/dossier-plain-field';
import { AmbulanceCallDetailResource } from '@/lib/types/models/ambulance-call/ambulance-call-resources';

function AmbulanceCallDossier({ ambulanceCall }: { ambulanceCall: AmbulanceCallDetailResource }) {
    return (
        <DossierLayout
            actions={{ title: 'Ambulance Call', dropdown: ambulanceCall.actions.dropdown }}
        >
            <DossierHeader title={'Ambulance Call'} subtitle={ambulanceCall.data.id} hideAvatar />
            <DossierContentShell>
                <DossierDateField label="Created At" value={ambulanceCall.data.createdAt} />
                <DossierEmployeeFieldLink label="Autors" employee={ambulanceCall.data.creator} />
                <DossierPlainField
                    label="Klients"
                    value={`${ambulanceCall.data.client.data.name} ${ambulanceCall.data.client.data.surname}`}
                />
                <DossierPlainField label="Iznākums" value={ambulanceCall.data.result} />
            </DossierContentShell>
        </DossierLayout>
    );
}

export default AmbulanceCallDossier;
