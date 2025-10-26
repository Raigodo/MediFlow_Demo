import { BaseFormProps } from '@/components/_shared/form/base-form-props';
import IconForm from '@/components/_shared/form/icon-form';
import { UserPreviewResource } from '@/lib/types/models/user/user-resources';

export interface SetUserIconFormProps extends BaseFormProps {
    user: UserPreviewResource;
}

function SetUserIconForm({ user, ...rest }: SetUserIconFormProps) {
    return <IconForm {...rest} action={user.actions.setIcon} currentIcon={user.data.avatarUrl} />;
}

export default SetUserIconForm;
