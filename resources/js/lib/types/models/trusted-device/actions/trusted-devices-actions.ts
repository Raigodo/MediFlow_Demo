import { ResourceActions } from '../../reource-actions';
import { ResourceActionsItem } from '../../reource-actions-item';

export interface TrustedDevicesActions extends ResourceActions {
    list: ResourceActionsItem;
    trust: ResourceActionsItem;
    untrust: ResourceActionsItem;
}
