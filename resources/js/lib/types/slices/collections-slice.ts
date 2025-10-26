import { AmbulanceCallCollectionResource } from '../models/ambulance-call/ambulance-call-resources';
import { ClientsActions } from '../models/client/actions/clients-actions';
import { ClientCollectionResource, ClientPreviewResource } from '../models/client/client-resources';
import { DiagnoseCollectionResource } from '../models/diagnose/diagnose-resources';
import { EmployeesActions } from '../models/employee/actions/employees-actions';
import {
    EmployeeCollectionResource,
    EmployeePreviewResource,
} from '../models/employee/employee-resources';
import { InvitationCollectionResource } from '../models/invitation/invitation-resources';
import { MeasurementCollectionResource } from '../models/measurement/measurement-resources';
import { MedicamentsActions } from '../models/medicament/actions/medicaments-actions';
import {
    MedicamentCollectionResource,
    MedicamentPreviewResource,
} from '../models/medicament/medicament-resources';
import { MedicationCollectionResource } from '../models/medication/medication-resources';
import { NoteCollectionResource } from '../models/note/note-resources';
import { StructureCollectionResource } from '../models/structure/structure-resources';
import { TrustedDeviceCollectionResource } from '../models/trusted-device/trusted-device-resources';
import { UserCollectionResource } from '../models/user/user-resources';
import { SharedData } from '../shared-data';
import { EmployeeRole } from '../values/employee-role';
import { FilterNoteFlag } from '../values/filter-note-flag';
import { UserRole } from '../values/user-role';
import { BasePaginatedPageSlice } from './base/paginated-page';

export interface CollectionsSlice extends SharedData {
    collections: {
        paginated: {
            ambulanceCalls: CollectionSliceItem<
                AmbulanceCallCollectionResource,
                AmbulanceCallsFilterSlice
            >;
            clients: CollectionSliceItem<ClientCollectionResource, ClientsFilterSlice>;
            diagnoses: CollectionSliceItem<DiagnoseCollectionResource, DiagnosesFilterSlice>;
            employees: CollectionSliceItem<EmployeeCollectionResource, EmployeeFilterSlice>;
            invitations: CollectionSliceItem<InvitationCollectionResource, InvitationFilterSlice>;
            measurements: CollectionSliceItem<
                MeasurementCollectionResource,
                MeasurementsFilterSlice
            >;
            medicaments: CollectionSliceItem<MedicamentCollectionResource, MedicamentsFilterSlice>;
            medications: CollectionSliceItem<MedicationCollectionResource, MedicationsFilterSlice>;
            notes: CollectionSliceItem<NoteCollectionResource, NotesFilterSlice>;
            devices: CollectionSliceItem<TrustedDeviceCollectionResource, DevicesFilterSlice>;
            structures: CollectionSliceItem<StructureCollectionResource, StructureFilterSlice>;
            users: CollectionSliceItem<UserCollectionResource, UserFilterSlice>;
        };
        clients: { data: ClientPreviewResource[]; actions: ClientsActions };
        employees: { data: EmployeePreviewResource[]; actions: EmployeesActions };
        medicaments: { data: MedicamentPreviewResource[]; actions: MedicamentsActions };
    };
}

type CollectionSliceItem<
    Tdata,
    Tfilter extends Record<string, string | boolean | number | undefined>,
> = {
    filter: Tfilter;
    collection: Tdata;
} & BasePaginatedPageSlice;

export type AmbulanceCallsFilterSlice = {
    createdFrom: string | undefined;
    createdTo: string | undefined;
    creator: string | undefined;
};
export type ClientsFilterSlice = {
    createdFrom: string | undefined;
    createdTo: string | undefined;
    archivedFrom: string | undefined;
    archivedTo: string | undefined;
};
export type DiagnosesFilterSlice = {
    createdFrom: string | undefined;
    createdTo: string | undefined;
    archived: boolean | undefined;
    archivedFrom: string | undefined;
    archivedTo: string | undefined;
    creator: string | undefined;
};
export type EmployeeFilterSlice = {
    createdFrom: string | undefined;
    createdTo: string | undefined;
    archived: boolean | undefined;
    archivedFrom: string | undefined;
    archivedTo: string | undefined;
};
export type InvitationFilterSlice = {
    createdFrom: string | undefined;
    createdTo: string | undefined;
    used: boolean | undefined;
};
export type MeasurementsFilterSlice = {
    createdFrom: string | undefined;
    createdTo: string | undefined;
    creator: string | undefined;
    type: number | undefined;
};
export type MedicamentsFilterSlice = Record<never, never>;
export type MedicationsFilterSlice = {
    createdFrom: string | undefined;
    createdTo: string | undefined;
    creator: string | undefined;
};
export type NotesFilterSlice = {
    createdFrom: string | undefined;
    createdTo: string | undefined;
    creator: string | undefined;
    role: EmployeeRole | undefined;
    flag: FilterNoteFlag | undefined;
};
export type StructureFilterSlice = {
    createdFrom: string | undefined;
    createdTo: string | undefined;
    role: UserRole | undefined;
};
export type DevicesFilterSlice = {
    createdFrom: string | undefined;
    createdTo: string | undefined;
    usedFrom: string | undefined;
    usedTo: string | undefined;
};
export type UserFilterSlice = {
    createdFrom: string | undefined;
    createdTo: string | undefined;
    archived: boolean | undefined;
    archivedFrom: string | undefined;
    archivedTo: string | undefined;
    verified: boolean | undefined;
    role: UserRole;
};
