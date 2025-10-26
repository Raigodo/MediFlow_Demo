import { BaseFormProps } from '@/components/_shared/form/base-form-props';
import FormInputLine from '@/components/_shared/form/input/form-input-line';
import {
    CompactForm,
    CompactFormField,
} from '@/components/_shared/modal/variant/write/compact-form';
import { useCurrentUser } from '@/lib/hooks/current/use-current-user';
import { useForm } from '@inertiajs/react';

function CreateStructureForm({ onSuccess }: BaseFormProps) {
    const user = useCurrentUser();
    const { post, data, setData, errors, processing, transform } = useForm({
        name: '',
    });

    if (!user) throw Error('can not preceed (No current User)');

    const action = user.actions.storeStructure;

    transform((data) => ({ _method: action.method, ...data }));

    function submit() {
        post(action.url, { onSuccess });
    }

    return (
        <CompactForm onSubmit={submit} processing={processing}>
            <CompactFormField label="Struktūrvienības nosaukums">
                <FormInputLine
                    value={data.name}
                    onChange={(value) => setData('name', value)}
                    message={errors.name}
                />
            </CompactFormField>
        </CompactForm>
    );
}

export default CreateStructureForm;
