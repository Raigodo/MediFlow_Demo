import { ResourceActions } from '../reource-actions';
import { ResourceActionsItem } from '../reource-actions-item';

export interface SessionActions extends ResourceActions {
    profile: ResourceActionsItem;
    settings: ResourceActionsItem;
    loginPage: ResourceActionsItem;
    login: ResourceActionsItem;
    joinPage: ResourceActionsItem;
    join: ResourceActionsItem;
    registerPage: ResourceActionsItem;
    register: ResourceActionsItem;
    logout: ResourceActionsItem;

    forgotPasswordPage: ResourceActionsItem;
    forgotPassword: ResourceActionsItem;
    resetPassword: ResourceActionsItem;
}
