import { ResourceActions } from '../../reource-actions';
import { ResourceActionsItem } from '../../reource-actions-item';

export interface MedicationActions extends ResourceActions {
    show: ResourceActionsItem;
    edit: ResourceActionsItem;
}
