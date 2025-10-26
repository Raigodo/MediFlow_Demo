import { EmployeePreview } from '../employee/employee-preview';
import { StructurePreview } from '../structure/structure-preview';

export type TrustedDevicePreview = {
    id: string;
    structure: StructurePreview;
    createdAt: string;
    note: string;
    lastUsedAt: string | null;
    lastEmployee: EmployeePreview | null;
    usedAt: string | null;
};
