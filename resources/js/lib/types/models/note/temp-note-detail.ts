import { AmbulanceCallCollectionResource } from '../ambulance-call/ambulance-call-resources';
import { ClientPreviewResource } from '../client/client-resources';
import { DiagnoseCollectionResource } from '../diagnose/diagnose-resources';
import { EmployeePreviewResource } from '../employee/employee-resources';
import { MeasurementCollectionResource } from '../measurement/measurement-resources';
import { MedicationCollectionResource } from '../medication/medication-resources';
import { ResourceActionsItem } from '../reource-actions-item';

export type TempNoteDetail = {
    id: string | null;

    content: string | null;
    isImportant: boolean;
    createdAt: string;

    creator: EmployeePreviewResource;
    client: ClientPreviewResource;

    ambulanceCalls: AmbulanceCallCollectionResource;
    diagnoses: DiagnoseCollectionResource;
    measurements: MeasurementCollectionResource;
    medications: MedicationCollectionResource;

    sections: Record<string, ResourceActionsItem>;
};
