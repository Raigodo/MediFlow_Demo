import { BaseFormProps } from '@/components/_shared/form/base-form-props';
import FormInputLine from '@/components/_shared/form/input/form-input-line';
import {
    CompactForm,
    CompactFormField,
} from '@/components/_shared/modal/variant/write/compact-form';
import { useSessionActions } from '@/lib/hooks/session/use-session-actions';
import { Link, useForm } from '@inertiajs/react';

function JoinForm({ onSuccess }: BaseFormProps) {
    const { join: action, forgotPasswordPage } = useSessionActions();
    const { post, data, setData, errors, processing } = useForm({
        _method: action.method,
        email: '',
        password: '',
        invitation: '',
    });

    function submit() {
        post(action.url, { onSuccess });
    }

    return (
        <CompactForm
            onSubmit={submit}
            processing={processing}
            className="mt-8"
            renderCancelButton={
                <div className="grid w-full items-start">
                    <Link
                        className="cursor-pointer text-sm text-blue-600 underline visited:text-purple-600 hover:text-blue-800"
                        href={forgotPasswordPage.url}
                    >
                        Forgot Password
                    </Link>
                </div>
            }
        >
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

export default JoinForm;
