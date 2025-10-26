import { BaseResource } from '../base-resource';
import { TrustedDeviceActions } from './actions/trusted-device-actions';
import { TrustedDevicesActions } from './actions/trusted-devices-actions';
import { TrustedDeviceDetail } from './trusted-device-detail';
import { TrustedDevicePreview } from './trusted-device-preview';

export type TrustedDevicePreviewResource = BaseResource<TrustedDevicePreview, TrustedDeviceActions>;
export type TrustedDeviceDetailResource = BaseResource<TrustedDeviceDetail, TrustedDeviceActions>;
export type TrustedDeviceCollectionResource = BaseResource<
    TrustedDevicePreviewResource[],
    TrustedDevicesActions
>;
