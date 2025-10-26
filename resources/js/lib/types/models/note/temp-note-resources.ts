import { BaseResource } from '../base-resource';
import { TempNoteActions } from './actions/temp-note-actions';
import { TempNoteDetail } from './temp-note-detail';

export type TempNoteDetailResource = BaseResource<TempNoteDetail, TempNoteActions>;
