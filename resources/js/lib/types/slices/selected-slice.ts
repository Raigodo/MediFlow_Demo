import { AmbulanceCallDetailResource } from '../models/ambulance-call/ambulance-call-resources';
import { ClientDetailResource } from '../models/client/client-resources';
import { DiagnoseDetailResource } from '../models/diagnose/diagnose-resources';
import { EmployeeDetailResource } from '../models/employee/employee-resources';
import { InvitationDetailResource } from '../models/invitation/invitation-resources';
import { MeasurementDetailResource } from '../models/measurement/measurement-resources';
import { MedicamentDetailResource } from '../models/medicament/medicament-resources';
import { MedicationDetailResource } from '../models/medication/medication-resources';
import { NoteDetailResource } from '../models/note/note-resources';
import { TempNoteDetailResource } from '../models/note/temp-note-resources';
import { StructureDetailResource } from '../models/structure/structure-resources';
import { TrustedDeviceDetailResource } from '../models/trusted-device/trusted-device-resources';
import { UserDetailResource } from '../models/user/user-resources';
import { SharedData } from '../shared-data';

export type SelectedSliceData = {
    user: UserDetailResource | undefined;
    client: ClientDetailResource | undefined;
    structure: StructureDetailResource | undefined;
    employee: EmployeeDetailResource | undefined;
    note: NoteDetailResource | undefined;
    tempNote: TempNoteDetailResource | undefined;
    invitation: InvitationDetailResource | undefined;
    device: TrustedDeviceDetailResource | undefined;
    ambulanceCall: AmbulanceCallDetailResource | undefined;
    measurement: MeasurementDetailResource | undefined;
    medicament: MedicamentDetailResource | undefined;
    medication: MedicationDetailResource | undefined;
    diagnose: DiagnoseDetailResource | undefined;
};

export interface SelectedSlice extends SharedData {
    selected: SelectedSliceData | undefined;
}
