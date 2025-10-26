import { ModalKey } from '../values/modal-key';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type ResourceActionsItem = {
    can?: boolean;
    url: string;
    method: HttpMethod;
    body?: Record<string, string | number | boolean>;
    metadata?: {
        preventRefresh?: boolean;
        modal?: ModalKey;
    };
};
