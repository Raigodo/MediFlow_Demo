import { ResourceActions } from '../../reource-actions';
import { ResourceActionsItem } from '../../reource-actions-item';

export interface ManagersActions extends ResourceActions {
    list: ResourceActionsItem;
}
