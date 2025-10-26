import { SessionResource } from '../models/session/session-resource';
import { SharedData } from '../shared-data';

export interface SessionSlice extends SharedData {
    session: SessionResource;
}
