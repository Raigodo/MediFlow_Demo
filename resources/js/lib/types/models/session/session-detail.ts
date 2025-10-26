import { ToolbarIconMap } from '@/lib/preset/toolbar/toolbar-icon-map';
import { EmployeeRole } from '../../values/employee-role';
import { EmployeePreviewResource } from '../employee/employee-resources';
import { MeasurementTypeCollectionResource } from '../measurement/measurement-resources';
import {
    MedicamentCollectionResource,
    MedicamentTypeCollectionResource,
} from '../medicament/medicament-resources';
import { ResourceActionsItem } from '../reource-actions-item';
import {
    StructureCollectionResource,
    StructureDetailResource,
} from '../structure/structure-resources';
import { UserDetailResource } from '../user/user-resources';

export type SessionDetail = {
    user: UserDetailResource | null;
    structure: StructureDetailResource | null;
    employee: EmployeePreviewResource | null;

    structures: StructureCollectionResource;
    accessibleEmployeeRoles: EmployeeRole[];
    medicaments: MedicamentCollectionResource;
    medicamentTypes: MedicamentTypeCollectionResource;
    measurementTypes: MeasurementTypeCollectionResource;
    breadcrumb: [];
    toolbar: {
        home: ResourceActionsItem;
        items: Record<keyof ToolbarIconMap, ResourceActionsItem>;
    };
};
