import { BaseResource } from '../base-resource';
import { SessionActions } from './session-actions';
import { SessionDetail } from './session-detail';

export type SessionResource = BaseResource<SessionDetail, SessionActions>;
