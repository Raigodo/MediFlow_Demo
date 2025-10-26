import { BaseResource } from '../base-resource';
import { DiagnoseActions } from './actions/diagnose-actions';
import { DiagnosesActions } from './actions/diagnoses-actions';
import { DiagnoseDetail } from './diagnose-detail';
import { DiagnosePreview } from './diagnose-preview';

export type DiagnosePreviewResource = BaseResource<DiagnosePreview, DiagnoseActions>;
export type DiagnoseDetailResource = BaseResource<DiagnoseDetail, DiagnoseActions>;
export type DiagnoseCollectionResource = BaseResource<DiagnosePreviewResource[], DiagnosesActions>;
