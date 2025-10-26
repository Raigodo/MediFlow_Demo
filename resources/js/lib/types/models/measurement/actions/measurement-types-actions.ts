import { ResourceActions } from '../../reource-actions';
import { ResourceActionsItem } from '../../reource-actions-item';

export interface MeasurementTypesActions extends ResourceActions {
    list: ResourceActionsItem;
}
