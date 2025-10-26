import { Label } from '@/components/_shared/ui/label';
import UserName from '@/components/_shared/user-name';
import { EmployeePreviewResource } from '@/lib/types/models/employee/employee-resources';
import { Link } from '@inertiajs/react';
import PreviewModalField from './preview-modal-field';

function PreviewModalEmployeeFieldLink({
    employee,
    label,
}: {
    employee: EmployeePreviewResource;
    label: string;
}) {
    return (
        <Link href={employee.actions.show.url}>
            <PreviewModalField className="hover:bg-muted">
                <Label>{label}</Label>
                <UserName user={employee?.data.user?.data} />
            </PreviewModalField>
        </Link>
    );
}

export default PreviewModalEmployeeFieldLink;
