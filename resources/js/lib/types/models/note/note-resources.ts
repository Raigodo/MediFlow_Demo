import { BaseResource } from '../base-resource';
import { NoteActions } from './actions/note-actions';
import { NotesActions } from './actions/notes-actions';
import { NoteDetail } from './note-detail';
import { NotePreview } from './note-preview';

export type NotePreviewResource = BaseResource<NotePreview, NoteActions>;
export type NoteDetailResource = BaseResource<NoteDetail, NoteActions>;
export type NoteCollectionResource = BaseResource<NotePreviewResource[], NotesActions>;
