import { BaseResource } from '../base-resource';
import { ManagerActions } from './actions/manager-actions';
import { ManagersActions } from './actions/managers-actions';
import { StructureActions } from './actions/structure-actions';
import { StructuresActions } from './actions/structures-actions';
import { ManagerPreview } from './manager-preview';
import { StructureDetail } from './structure-detail';
import { StructurePreview } from './structure-preview';

export type StructurePreviewResource = BaseResource<StructurePreview, StructureActions>;
export type StructureDetailResource = BaseResource<StructureDetail, StructureActions>;
export type StructureCollectionResource = BaseResource<
    StructurePreviewResource[],
    StructuresActions
>;

export type ManagerPreviewResource = BaseResource<ManagerPreview, ManagerActions>;
export type ManagerCollectionResource = BaseResource<ManagerPreviewResource[], ManagersActions>;
