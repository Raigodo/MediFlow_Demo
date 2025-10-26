import { SharedData } from '../shared-data';

export interface MessageSlice extends SharedData {
    message: {
        title: string;
        details: string;
        variant: string;
    };
}
