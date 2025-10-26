import { ResourceActions } from '../../reource-actions';
import { ResourceActionsItem } from '../../reource-actions-item';

export interface DiagnosesActions extends ResourceActions {
    list: ResourceActionsItem;
    create: ResourceActionsItem;
    archived: ResourceActionsItem;
}
