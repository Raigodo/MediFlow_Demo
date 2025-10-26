import { DossierLayout } from '@/components/_shared/dossier/dossier-layout';
import { DossierContentShell, DossierHeader } from '@/components/_shared/dossier/dossier-main';
import DossierDateField from '@/components/_shared/dossier/field/dossier-date-field';
import DossierEmployeeFieldLink from '@/components/_shared/dossier/field/dossier-employee-field-link';
import DossierTextareaField from '@/components/_shared/dossier/field/dossier-textarea-field';
import { TrustedDeviceDetailResource } from '@/lib/types/models/trusted-device/trusted-device-resources';

function DeviceDossier({ device }: { device: TrustedDeviceDetailResource }) {
    return (
        <DossierLayout actions={{ title: 'Trusted Dvice', dropdown: device.actions.dropdown }}>
            <DossierHeader title={'Trusted Device'} subtitle={device.data.id} hideAvatar />
            <DossierContentShell>
                <DossierDateField label="Izveidots" value={device.data.createdAt} />
                <DossierDateField label="Pēdējā piekļuve" value={device.data.lastUsedAt} />
                <DossierEmployeeFieldLink
                    label="Pēdējais piekļuva"
                    employee={device.data.lastEmployee}
                />
                <DossierTextareaField label="Piezīme" value={device.data.note} />
            </DossierContentShell>
        </DossierLayout>
    );
}

export default DeviceDossier;
