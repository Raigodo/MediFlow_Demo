import { BaseFormProps } from '@/components/_shared/form/base-form-props';
import IconForm from '@/components/_shared/form/icon-form';
import { ClientPreviewResource } from '@/lib/types/models/client/client-resources';

interface SetClientIconFormProps extends BaseFormProps {
    client: ClientPreviewResource;
}

function SetClientIconForm({ client, ...rest }: SetClientIconFormProps) {
    return (
        <IconForm {...rest} action={client.actions.setIcon} currentIcon={client.data.avatarUrl} />
    );
}

export default SetClientIconForm;
