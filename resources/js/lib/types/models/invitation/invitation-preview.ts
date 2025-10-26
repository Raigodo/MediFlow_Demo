import { EmployeeRole } from '@/lib/types/values/employee-role';
import { EmployeePreviewResource } from '../employee/employee-resources';
import { StructurePreviewResource } from '../structure/structure-resources';

export type InvitationPreview = {
    id: string;
    role: EmployeeRole;
    tokenValue: string;
    note: string;
    createdAt: string;

    createdEmployee: EmployeePreviewResource | null;
    structure: StructurePreviewResource;
};
