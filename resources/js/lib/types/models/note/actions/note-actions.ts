import { ResourceActions } from '../../reource-actions';
import { ResourceActionsItem } from '../../reource-actions-item';

export interface NoteActions extends ResourceActions {
    show: ResourceActionsItem;
    destroy: ResourceActionsItem;
    forceEdit: ResourceActionsItem;
    forceUpdate: ResourceActionsItem;
}
