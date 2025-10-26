import { BaseResource } from '../base-resource';
import { MedicationActions } from './actions/medication-actions';
import { MedicationsActions } from './actions/medications-actions';
import { MedicationDetail } from './medication-detail';
import { MedicationPreview } from './medication-preview';

export type MedicationPreviewResource = BaseResource<MedicationPreview, MedicationActions>;
export type MedicationDetailResource = BaseResource<MedicationDetail, MedicationActions>;
export type MedicationCollectionResource = BaseResource<
    MedicationPreviewResource[],
    MedicationsActions
>;
