import { ResourceActions } from '../../reource-actions';
import { ResourceActionsItem } from '../../reource-actions-item';

export interface TempNoteActions extends ResourceActions {
    store: ResourceActionsItem;
}
