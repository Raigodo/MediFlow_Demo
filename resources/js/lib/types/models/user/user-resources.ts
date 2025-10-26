import { BaseResource } from '../base-resource';
import { UserActions } from './actions/user-actions';
import { UsersActions } from './actions/users-actions';
import { UserDetail } from './user-detail';
import { UserPreview } from './user-preview';

export type UserPreviewResource = BaseResource<UserPreview, UserActions>;
export type UserDetailResource = BaseResource<UserDetail, UserActions>;
export type UserCollectionResource = BaseResource<UserPreviewResource[], UsersActions>;
