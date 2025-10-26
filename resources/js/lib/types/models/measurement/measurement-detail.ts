import { ClientPreviewResource } from '../client/client-resources';
import { EmployeePreviewResource } from '../employee/employee-resources';
import { NotePreviewResource } from '../note/note-resources';
import { MeasurementTypePreviewResource } from './measurement-resources';

export type MeasurementDetail = {
    id: string;
    value: number;
    createdAt: string;

    measurementType: MeasurementTypePreviewResource;
    creator: EmployeePreviewResource;
    client: ClientPreviewResource;
    note: NotePreviewResource;
};
