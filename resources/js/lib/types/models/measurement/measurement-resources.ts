import { BaseResource } from '../base-resource';
import { MeasurementActions } from './actions/measurement-actions';
import { MeasurementTypeActions } from './actions/measurement-type-actions';
import { MeasurementTypesActions } from './actions/measurement-types-actions';
import { MeasurementsActions } from './actions/measurements-actions';
import { MeasurementDetail } from './measurement-detail';
import { MeasurementPreview } from './measurement-preview';
import { MeasurementTypePreview } from './measurement-type-preview';

export type MeasurementPreviewResource = BaseResource<MeasurementPreview, MeasurementActions>;
export type MeasurementDetailResource = BaseResource<MeasurementDetail, MeasurementActions>;
export type MeasurementCollectionResource = BaseResource<
    MeasurementPreviewResource[],
    MeasurementsActions
>;

export type MeasurementTypePreviewResource = BaseResource<
    MeasurementTypePreview,
    MeasurementTypeActions
>;
export type MeasurementTypeCollectionResource = BaseResource<
    MeasurementTypePreviewResource[],
    MeasurementTypesActions
>;
