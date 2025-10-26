import { ResourceActions } from './reource-actions';

export type BaseResource<
    Tdata extends Record<string, unknown> | Array<unknown>,
    Tactions extends ResourceActions,
> = {
    data: Tdata;
    actions: Tactions;
};
