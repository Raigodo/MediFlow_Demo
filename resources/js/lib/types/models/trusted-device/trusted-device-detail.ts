import { EmployeePreviewResource } from '../employee/employee-resources';
import { StructurePreviewResource } from '../structure/structure-resources';

export type TrustedDeviceDetail = {
    id: string;
    structure: StructurePreviewResource;
    createdAt: string;
    note: string;
    lastUsedAt: string | null;
    lastEmployee: EmployeePreviewResource | null;
    usedAt: string | null;
};
