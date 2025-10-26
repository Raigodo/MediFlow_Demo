import { ClientPreviewResource } from '../client/client-resources';
import { EmployeePreviewResource } from '../employee/employee-resources';
import { NotePreviewResource } from '../note/note-resources';

export type DiagnosePreview = {
    id: string;
    name: string;
    createdAt: string;
    archivedOn: string | undefined;

    creator: EmployeePreviewResource;
    client: ClientPreviewResource;
    note: NotePreviewResource;
};
