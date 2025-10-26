import { ResourceActions } from '../../reource-actions';
import { ResourceActionsItem } from '../../reource-actions-item';

export interface ClientActions extends ResourceActions {
    show: ResourceActionsItem;
    edit: ResourceActionsItem;
    update: ResourceActionsItem;
    archive: ResourceActionsItem;
    setIcon: ResourceActionsItem;

    ambulanceCalls: ResourceActionsItem;
    diagnoses: ResourceActionsItem;
    measurements: ResourceActionsItem;
    medications: ResourceActionsItem;

    notes: ResourceActionsItem;
    writeNote: ResourceActionsItem;
    storeNote: ResourceActionsItem;
}
