import { ResourceActions } from '../../reource-actions';
import { ResourceActionsItem } from '../../reource-actions-item';

export interface StructuresActions extends ResourceActions {
    list: ResourceActionsItem;
    create: ResourceActionsItem;
    store: ResourceActionsItem;
}
