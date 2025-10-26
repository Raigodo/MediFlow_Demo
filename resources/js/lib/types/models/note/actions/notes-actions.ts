import { ResourceActions } from '../../reource-actions';
import { ResourceActionsItem } from '../../reource-actions-item';

export interface NotesActions extends ResourceActions {
    list: ResourceActionsItem;
    write: ResourceActionsItem;
    store: ResourceActionsItem;
}
