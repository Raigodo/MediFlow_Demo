import { ClientPreviewResource } from '../client/client-resources';
import { EmployeePreviewResource } from '../employee/employee-resources';
import { NotePreviewResource } from '../note/note-resources';

export type AmbulanceCallDetail = {
    id: string;
    result: string;
    createdAt: string;

    creator: EmployeePreviewResource;
    client: ClientPreviewResource;
    note: NotePreviewResource;
};
