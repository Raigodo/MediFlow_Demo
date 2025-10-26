import { DossierLayout } from '@/components/_shared/dossier/dossier-layout';
import { DossierContentShell, DossierHeader } from '@/components/_shared/dossier/dossier-main';
import DossierClientFieldLink from '@/components/_shared/dossier/field/dossier-client-field-link';
import DossierDateField from '@/components/_shared/dossier/field/dossier-date-field';
import DossierEmployeeFieldLink from '@/components/_shared/dossier/field/dossier-employee-field-link';
import DossierPlainField from '@/components/_shared/dossier/field/dossier-plain-field';
import { MeasurementDetailResource } from '@/lib/types/models/measurement/measurement-resources';

function MeasurementDossier({ measurement }: { measurement: MeasurementDetailResource }) {
    return (
        <DossierLayout actions={{ title: 'Measurement', dropdown: measurement.actions.dropdown }}>
            <DossierHeader title={'Measurement'} subtitle={measurement.data.id} hideAvatar />
            <DossierContentShell>
                <DossierDateField label="Created At" value={measurement.data.createdAt} />
                <DossierEmployeeFieldLink label="Autors" employee={measurement.data.creator} />
                <DossierClientFieldLink label="Klients" client={measurement.data.client} />
                <DossierPlainField
                    label="Mērījums"
                    value={measurement.data.measurementType.data.name}
                />
                <DossierPlainField
                    label="Vērtība"
                    value={measurement.data.measurementType.data.name}
                    postfix={measurement.data.measurementType.data.units}
                />
            </DossierContentShell>
        </DossierLayout>
    );
}

export default MeasurementDossier;
