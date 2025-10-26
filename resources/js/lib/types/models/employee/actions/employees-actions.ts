import { ResourceActions } from '../../reource-actions';
import { ResourceActionsItem } from '../../reource-actions-item';

export interface EmployeesActions extends ResourceActions {
    list: ResourceActionsItem;
}
