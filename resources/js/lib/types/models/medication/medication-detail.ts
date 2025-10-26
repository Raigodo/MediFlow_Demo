import { ClientPreviewResource } from '../client/client-resources';
import { EmployeePreviewResource } from '../employee/employee-resources';
import { MedicamentPreviewResource } from '../medicament/medicament-resources';
import { NotePreviewResource } from '../note/note-resources';

export type MedicationDetail = {
    id: string;
    amount: number;
    createdAt: string;

    medicament: MedicamentPreviewResource;
    creator: EmployeePreviewResource;
    client: ClientPreviewResource;
    note: NotePreviewResource;
};
