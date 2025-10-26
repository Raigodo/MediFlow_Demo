import { ResourceActions } from '../../reource-actions';
import { ResourceActionsItem } from '../../reource-actions-item';

export interface EmployeeActions extends ResourceActions {
    show: ResourceActionsItem;
    activate: ResourceActionsItem;
    deactivate: ResourceActionsItem;
    promoteNurse: ResourceActionsItem;
    demoteNurse: ResourceActionsItem;
    alter: ResourceActionsItem;
    alterReset: ResourceActionsItem;
}
