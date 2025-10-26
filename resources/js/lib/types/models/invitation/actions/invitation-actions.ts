import { ResourceActions } from '../../reource-actions';
import { ResourceActionsItem } from '../../reource-actions-item';

export interface InvitationActions extends ResourceActions {
    show: ResourceActionsItem;
    edit: ResourceActionsItem;
    update: ResourceActionsItem;
    destroy: ResourceActionsItem;
}
