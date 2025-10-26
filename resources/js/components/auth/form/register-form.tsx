import { BaseFormProps } from '@/components/_shared/form/base-form-props';
import FormInputLine from '@/components/_shared/form/input/form-input-line';
import {
    CompactForm,
    CompactFormField,
} from '@/components/_shared/modal/variant/write/compact-form';
import { useSessionActions } from '@/lib/hooks/session/use-session-actions';
import { useForm } from '@inertiajs/react';

function RegisterForm({ onSuccess }: BaseFormProps) {
    const { register: action } = useSessionActions();
    const { post, data, setData, errors, processing } = useForm({
        _method: action.method,
        name: '',
        surname: '',
        email: '',
        password: '',
        invitation: '',
    });

    function submit() {
        post(action.url, { onSuccess });
    }

    return (
        <CompactForm onSubmit={submit} processing={processing} className="mt-8">
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

            <CompactFormField label="Epasts">
                <FormInputLine
                    id="join.email"
                    placeholder="epasts@gmail.com"
                    value={data.email}
                    onChange={(value) => setData('email', value)}
                    message={errors.email}
                />
            </CompactFormField>

            <CompactFormField label="Parole">
                <FormInputLine
                    type="password"
                    value={data.password}
                    onChange={(value) => setData('password', value)}
                    message={errors.password}
                />
            </CompactFormField>

            <CompactFormField label="Ielūgums">
                <FormInputLine
                    placeholder="xxxxx-xxxxxx-xxxxx"
                    value={data.invitation}
                    onChange={(value) => setData('invitation', value)}
                    message={errors.invitation}
                />
            </CompactFormField>
        </CompactForm>
    );
}

export default RegisterForm;
