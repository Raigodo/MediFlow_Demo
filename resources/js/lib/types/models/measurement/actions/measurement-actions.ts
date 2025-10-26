import { ResourceActions } from '../../reource-actions';
import { ResourceActionsItem } from '../../reource-actions-item';

export interface MeasurementActions extends ResourceActions {
    show: ResourceActionsItem;
    edit: ResourceActionsItem;
}
