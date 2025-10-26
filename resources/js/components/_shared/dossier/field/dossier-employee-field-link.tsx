import { EmployeePreviewResource } from '@/lib/types/models/employee/employee-resources';
import { Link } from '@inertiajs/react';
import { Label } from '../../ui/label';
import UserName from '../../user-name';
import { DossierFieldShell } from './dossier-field-shell';

function DossierEmployeeFieldLink({
    employee,
    label,
}: {
    employee: EmployeePreviewResource | undefined | null;
    label: string;
}) {
    if (employee) {
        return (
            <Link href={employee.actions.show.url}>
                <DossierFieldShell className="hover:bg-muted">
                    <Label>{label}</Label>
                    <UserName user={employee.data.user?.data} />
                </DossierFieldShell>
            </Link>
        );
    }
    return (
        <DossierFieldShell>
            <Label>{label}</Label>
            No Employee
        </DossierFieldShell>
    );
}

export default DossierEmployeeFieldLink;
