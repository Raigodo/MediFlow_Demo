import { EmployeeRole } from '@/lib/types/values/employee-role';
import { StructurePreviewResource } from '../structure/structure-resources';
import { UserPreviewResource } from '../user/user-resources';

export type EmployeeDetail = {
    id: string;
    role: EmployeeRole;
    createdAt: string;
    deactivatedAt: string | null;

    structure: StructurePreviewResource;
    user: UserPreviewResource | null;
};
