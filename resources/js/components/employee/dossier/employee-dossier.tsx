import { DossierLayout } from '@/components/_shared/dossier/dossier-layout';
import { DossierContentShell, DossierHeader } from '@/components/_shared/dossier/dossier-main';
import DossierDateField from '@/components/_shared/dossier/field/dossier-date-field';
import DossierPlainField from '@/components/_shared/dossier/field/dossier-plain-field';
import UserName from '@/components/_shared/user-name';
import { useLocalEnum } from '@/lib/hooks/locale/useLocalEnum';
import { EmployeeDetailResource } from '@/lib/types/models/employee/employee-resources';

function EmployeeDossier({ employee }: { employee: EmployeeDetailResource }) {
    const { employeeRole } = useLocalEnum();

    return (
        <DossierLayout actions={{ title: 'Employee', dropdown: employee.actions.dropdown }}>
            <DossierHeader
                title={<UserName user={employee.data.user?.data} />}
                subtitle={employee.data.id}
                iconUrl={employee.data.user?.data.avatarUrl}
            />
            <DossierContentShell>
                <DossierPlainField label="Role" value={employeeRole(employee.data.role)} />
                <DossierDateField label="Joined On" value={employee.data.createdAt} />
                <DossierPlainField
                    label="Status"
                    value={employee.data.deactivatedAt ? 'Neaktīvs' : 'Aktīvs'}
                />
                {employee.data.deactivatedAt && (
                    <DossierDateField label="Deactivated At" value={employee.data.deactivatedAt} />
                )}
            </DossierContentShell>
        </DossierLayout>
    );
}

export default EmployeeDossier;
