import { ResourceActions } from '../../reource-actions';
import { ResourceActionsItem } from '../../reource-actions-item';

export interface DiagnoseActions extends ResourceActions {
    show: ResourceActionsItem;
    edit: ResourceActionsItem;
    archive: ResourceActionsItem;
}
