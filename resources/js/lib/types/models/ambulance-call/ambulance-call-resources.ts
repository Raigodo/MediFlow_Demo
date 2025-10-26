import { BaseResource } from '../base-resource';
import { AmbulanceCallActions } from './actions/ambulance-call-actions';
import { AmbulanceCallsActions } from './actions/ambulance-calls-actions';
import { AmbulanceCallDetail } from './ambulance-call-detail';
import { AmbulanceCallPreview } from './ambulance-call-peview';

export type AmbulanceCallPreviewResource = BaseResource<AmbulanceCallPreview, AmbulanceCallActions>;
export type AmbulanceCallDetailResource = BaseResource<AmbulanceCallDetail, AmbulanceCallActions>;
export type AmbulanceCallCollectionResource = BaseResource<
    AmbulanceCallPreviewResource[],
    AmbulanceCallsActions
>;
