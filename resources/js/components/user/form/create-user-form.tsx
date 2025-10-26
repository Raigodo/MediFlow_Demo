import { BaseFormProps } from '@/components/_shared/form/base-form-props';
import FormInputLine from '@/components/_shared/form/input/form-input-line';
import FormInputUserRole from '@/components/_shared/form/input/form-input-user-role';
import {
    CompactForm,
    CompactFormField,
    CompactFormRow,
} from '@/components/_shared/modal/variant/write/compact-form';
import { useCurrentUser } from '@/lib/hooks/current/use-current-user';
import { UserRole } from '@/lib/types/values/user-role';
import { useForm } from '@inertiajs/react';

function CreateUserForm({ onSuccess }: BaseFormProps) {
    const user = useCurrentUser();
    const { post, data, setData, errors, processing, transform } = useForm({
        name: '',
        surname: '',
        email: '',
        password: '',
        role: UserRole.Manager,
    });

    if (!user) throw Error('can not preceed (No current User)');

    const action = user.actions.store;

    transform((data) => ({ _method: action.method, ...data }));

    function submit() {
        post(action.url, { onSuccess });
    }

    return (
        <CompactForm onSubmit={submit} processing={processing}>
            <CompactFormRow>
                <CompactFormField label="Vārds">
                    <FormInputLine
                        value={data.name}
                        onChange={(value) => setData('name', value)}
                        message={errors.name}
                    />
                </CompactFormField>
                <CompactFormField label="Uzvārds">
                    <FormInputLine
                        value={data.surname}
                        onChange={(value) => setData('surname', value)}
                        message={errors.surname}
                    />
                </CompactFormField>
            </CompactFormRow>

            <CompactFormField label="Epasts">
                <FormInputLine
                    value={data.email}
                    onChange={(value) => setData('email', value)}
                    message={errors.email}
                />
            </CompactFormField>
            <CompactFormField label="Parole">
                <FormInputLine
                    value={data.password}
                    onChange={(value) => setData('password', value)}
                    message={errors.password}
                />
            </CompactFormField>

            <CompactFormField label="Lietotāja loma">
                <FormInputUserRole
                    value={data.role}
                    onChange={(value) => setData('role', value)}
                    message={errors.role}
                />
            </CompactFormField>
        </CompactForm>
    );
}

export default CreateUserForm;
