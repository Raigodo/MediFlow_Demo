import { BaseFormProps } from '@/components/_shared/form/base-form-props';
import FormInputLine from '@/components/_shared/form/input/form-input-line';
import {
    CompactForm,
    CompactFormField,
} from '@/components/_shared/modal/variant/write/compact-form';
import { useSessionActions } from '@/lib/hooks/session/use-session-actions';
import { Link, useForm } from '@inertiajs/react';

function LoginForm({ onSuccess }: BaseFormProps) {
    const { login: action, forgotPasswordPage } = useSessionActions();
    const { post, data, setData, errors, processing } = useForm({
        _method: action.method,
        email: '',
        password: '',
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
                    placeholder="epasts@gmail.com"
                    value={data.email}
                    onChange={(value) => setData('email', value)}
                    message={errors.email}
                />
            </CompactFormField>

            <CompactFormField label="Parole">
                <FormInputLine
                    type="password"
                    placeholder="********"
                    value={data.password}
                    onChange={(value) => setData('password', value)}
                    message={errors.password}
                />
            </CompactFormField>
        </CompactForm>
    );
}

export default LoginForm;
