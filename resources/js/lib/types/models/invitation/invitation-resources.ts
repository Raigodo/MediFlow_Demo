import { BaseResource } from '../base-resource';
import { InvitationActions } from './actions/invitation-actions';
import { InvitationsActions } from './actions/invitations-actions';
import { InvitationDetail } from './invitation-detail';
import { InvitationPreview } from './invitation-preview';

export type InvitationPreviewResource = BaseResource<InvitationPreview, InvitationActions>;
export type InvitationDetailResource = BaseResource<InvitationDetail, InvitationActions>;
export type InvitationCollectionResource = BaseResource<
    InvitationPreviewResource[],
    InvitationsActions
>;
