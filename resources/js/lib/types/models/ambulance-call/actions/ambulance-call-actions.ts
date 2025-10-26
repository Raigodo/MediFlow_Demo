import { ResourceActions } from '../../reource-actions';
import { ResourceActionsItem } from '../../reource-actions-item';

export interface AmbulanceCallActions extends ResourceActions {
    show: ResourceActionsItem;
    edit: ResourceActionsItem;
}
