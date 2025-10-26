import { BaseResource } from '../base-resource';
import { MedicamentActions } from './actions/medicament-actions';
import { MedicamentTypeActions } from './actions/medicament-type-actions';
import { MedicamentTypesActions } from './actions/medicament-types-actions';
import { MedicamentsActions } from './actions/medicaments-actions';
import { MedicamentDetail } from './medicament-detail';
import { MedicamentPreview } from './medicament-preview';
import { MedicamentTypePreview } from './medicament-type-preview';

export type MedicamentPreviewResource = BaseResource<MedicamentPreview, MedicamentActions>;
export type MedicamentDetailResource = BaseResource<MedicamentDetail, MedicamentActions>;
export type MedicamentCollectionResource = BaseResource<
    MedicamentPreviewResource[],
    MedicamentsActions
>;

export type MedicamentTypePreviewResource = BaseResource<
    MedicamentTypePreview,
    MedicamentTypeActions
>;
export type MedicamentTypeCollectionResource = BaseResource<
    MedicamentTypePreviewResource[],
    MedicamentTypesActions
>;
