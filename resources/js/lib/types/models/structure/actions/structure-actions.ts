import { ResourceActions } from '../../reource-actions';
import { ResourceActionsItem } from '../../reource-actions-item';

export interface StructureActions extends ResourceActions {
    show: ResourceActionsItem;
    edit: ResourceActionsItem;
    update: ResourceActionsItem;
    destroy: ResourceActionsItem;
    setIcon: ResourceActionsItem;

    rescope: ResourceActionsItem;

    clients: ResourceActionsItem;
    employees: ResourceActionsItem;
    invitations: ResourceActionsItem;
    devices: ResourceActionsItem;
    medicaments: ResourceActionsItem;

    storeClient: ResourceActionsItem;
    storeInvitation: ResourceActionsItem;
    storeMedicaments: ResourceActionsItem;
}
