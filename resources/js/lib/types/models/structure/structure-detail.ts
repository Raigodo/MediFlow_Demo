import { EmployeePreviewResource } from '../employee/employee-resources';
import { ResourceActionsItem } from '../reource-actions-item';
import { ManagerCollectionResource } from './structure-resources';

export type StructureDetail = {
    id: string;
    createdAt: string;
    name: string;
    iconUrl: string;

    managers: ManagerCollectionResource;
    medicamentManager: EmployeePreviewResource | undefined;

    sections: Record<string, ResourceActionsItem>;
};
