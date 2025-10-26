import { ClientActions } from '../models/client/actions/client-actions';
import { ClientPreviewResource } from '../models/client/client-resources';
import { SharedData } from '../shared-data';
import { EmployeeRole } from '../values/employee-role';

export interface SidelistSlice extends SharedData {
    sidelists: {
        clients: {
            items: ClientPreviewResource[];
            roles: EmployeeRole[];
            role: EmployeeRole;
            actionKey: keyof Omit<ClientActions, 'dropdown'>;
        };
    };
}
