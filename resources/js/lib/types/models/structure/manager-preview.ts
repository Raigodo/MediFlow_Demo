import { UserPreviewResource } from '../user/user-resources';
import { StructurePreviewResource } from './structure-resources';

export type ManagerPreview = { user: UserPreviewResource; structure: StructurePreviewResource };
