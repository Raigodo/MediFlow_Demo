import { SetClientIconModalComponentProps } from '@/components/client/modal/set-client-icon-modal';
import { SetStructureIconModalComponentProps } from '@/components/structure/modal/set-structure-icon-modal';
import { SetProfileIconModalComponentProps } from '@/components/user/modal/set-profile-icon-modal';
import { SetIconModalKey } from '@/lib/types/values/modal-key';

export type SetIconModalMap = {
    [SetIconModalKey.SET_CLIENT_ICON]: SetClientIconModalComponentProps;
    [SetIconModalKey.SET_PROFILE_ICON]: SetProfileIconModalComponentProps;
    [SetIconModalKey.SET_STRUCTURE_ICON]: SetStructureIconModalComponentProps;
};
