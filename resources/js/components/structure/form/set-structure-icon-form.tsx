import { BaseFormProps } from '@/components/_shared/form/base-form-props';
import IconForm from '@/components/_shared/form/icon-form';
import { StructurePreviewResource } from '@/lib/types/models/structure/structure-resources';

export interface SetClientIconFormProps extends BaseFormProps {
    structure: StructurePreviewResource;
}

function SetStructureIconForm({ structure, ...rest }: SetClientIconFormProps) {
    return (
        <IconForm
            {...rest}
            action={structure.actions.setIcon}
            currentIcon={structure.data.iconUrl}
        />
    );
}

export default SetStructureIconForm;
