import { ResourceActions } from '../../reource-actions';
import { ResourceActionsItem } from '../../reource-actions-item';

export interface MedicamentsActions extends ResourceActions {
    list: ResourceActionsItem;
    supply: ResourceActionsItem;
    batchStore: ResourceActionsItem;
}
