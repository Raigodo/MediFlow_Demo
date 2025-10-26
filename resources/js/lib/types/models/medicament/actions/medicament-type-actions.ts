import { ResourceActions } from '../../reource-actions';
import { ResourceActionsItem } from '../../reource-actions-item';

export interface MedicamentTypeActions extends ResourceActions {
    show: ResourceActionsItem;
    edit: ResourceActionsItem;
    update: ResourceActionsItem;
    destroy: ResourceActionsItem;
}
