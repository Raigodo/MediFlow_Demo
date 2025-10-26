import FormInputLine from '@/components/_shared/form/input/form-input-line';
import {
    CompactForm,
    CompactFormField,
} from '@/components/_shared/modal/variant/write/compact-form';
import { Label } from '@/components/_shared/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import { useSessionActions } from '@/lib/hooks/session/use-session-actions';
import { useForm, usePage } from '@inertiajs/react';

function ResetPasswordPage() {
    const { props } = usePage();
    const { resetPassword } = useSessionActions();

    const { post, data, setData, errors, processing } = useForm({
        _method: resetPassword.method,
        token: props.token as string,
        email: props.email as string,
        password: '',
        passwordConfirmation: '',
    });

    function handleSubmit() {
        post(resetPassword.url);
    }

    return (
        <AuthLayout hideNav>
            <Label className="text-lg">Reset Password</Label>
            <CompactForm onSubmit={handleSubmit} processing={processing}>
                <CompactFormField label="email">
                    <FormInputLine
                        value={data.email}
                        onChange={(value) => setData('email', value)}
                        message={errors.email}
                    />
                </CompactFormField>
                <CompactFormField label="password">
                    <FormInputLine
                        type="password"
                        value={data.password}
                        onChange={(value) => setData('password', value)}
                        message={errors.password}
                    />
                </CompactFormField>
                <CompactFormField label="confirm password">
                    <FormInputLine
                        value={data.passwordConfirmation}
                        onChange={(value) => setData('passwordConfirmation', value)}
                        message={errors.passwordConfirmation}
                    />
                </CompactFormField>
            </CompactForm>
        </AuthLayout>
    );
}

export default ResetPasswordPage;
