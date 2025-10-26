import { ResourceActions } from '../../reource-actions';
import { ResourceActionsItem } from '../../reource-actions-item';

export interface MedicationsActions extends ResourceActions {
    list: ResourceActionsItem;
    create: ResourceActionsItem;
}
