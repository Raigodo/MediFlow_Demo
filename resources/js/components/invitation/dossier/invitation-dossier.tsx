import { DossierLayout } from '@/components/_shared/dossier/dossier-layout';
import { DossierContentShell, DossierHeader } from '@/components/_shared/dossier/dossier-main';
import DossierCopyableField from '@/components/_shared/dossier/field/dossier-copyable-field';
import DossierDateField from '@/components/_shared/dossier/field/dossier-date-field';
import DossierEmployeeFieldLink from '@/components/_shared/dossier/field/dossier-employee-field-link';
import DossierPlainField from '@/components/_shared/dossier/field/dossier-plain-field';
import { useLocalEnum } from '@/lib/hooks/locale/useLocalEnum';
import { InvitationDetailResource } from '@/lib/types/models/invitation/invitation-resources';

function InvitationDossier({ invitation }: { invitation: InvitationDetailResource }) {
    const { employeeRole } = useLocalEnum();

    return (
        <DossierLayout actions={{ title: 'Invitation', dropdown: invitation.actions.dropdown }}>
            <DossierHeader
                title={'Invitation'}
                subtitle={invitation.data.id}
                iconUrl={invitation.data.structure.data.iconUrl}
                hideAvatar
            />
            <DossierContentShell>
                <DossierPlainField label="Amats" value={employeeRole(invitation.data.role)} />
                <DossierDateField label="Izveidots" value={invitation.data.createdAt} />
                <DossierPlainField label="Amats" value={invitation.data.role} />
                <DossierCopyableField label="Ielūguma Kods" value={invitation.data.tokenValue} />
                <DossierPlainField
                    label="Statuss"
                    value={invitation.data.createdEmployee ? 'Izlietots' : 'Aktīvs'}
                />
                {invitation.data.createdEmployee && (
                    <DossierEmployeeFieldLink
                        label="Izlietoja"
                        employee={invitation.data.createdEmployee}
                    />
                )}
            </DossierContentShell>
        </DossierLayout>
    );
}

export default InvitationDossier;
