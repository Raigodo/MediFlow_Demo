import { ClientPreviewResource } from '../client/client-resources';
import { EmployeePreviewResource } from '../employee/employee-resources';

export type NotePreview = {
    id: string;
    content: string | null;
    isImportant: boolean;
    createdAt: string;

    creator: EmployeePreviewResource;
    client: ClientPreviewResource;
};
