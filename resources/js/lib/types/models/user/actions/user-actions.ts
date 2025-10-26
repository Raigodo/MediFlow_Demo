import { ResourceActions } from '../../reource-actions';
import { ResourceActionsItem } from '../../reource-actions-item';

export interface UserActions extends ResourceActions {
    list: ResourceActionsItem;
    show: ResourceActionsItem;
    create: ResourceActionsItem;
    store: ResourceActionsItem;
    edit: ResourceActionsItem;
    update: ResourceActionsItem;
    destroy: ResourceActionsItem;
    setIcon: ResourceActionsItem;
    alter: ResourceActionsItem;
    alterReset: ResourceActionsItem;

    structures: ResourceActionsItem;

    storeStructure: ResourceActionsItem;
}
