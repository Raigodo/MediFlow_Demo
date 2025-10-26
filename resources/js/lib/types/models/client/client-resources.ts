import { BaseResource } from '../base-resource';
import { ClientActions } from './actions/client-actions';
import { ClientsActions } from './actions/clients-actions';
import { ClientDetail } from './client-detail';
import { ClientPreview } from './client-preview';

export type ClientPreviewResource = BaseResource<ClientPreview, ClientActions>;
export type ClientDetailResource = BaseResource<ClientDetail, ClientActions>;
export type ClientCollectionResource = BaseResource<ClientPreviewResource[], ClientsActions>;
