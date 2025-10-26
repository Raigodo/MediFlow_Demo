import FormInputLine from '@/components/_shared/form/input/form-input-line';
import {
    CompactForm,
    CompactFormField,
} from '@/components/_shared/modal/variant/write/compact-form';
import { Label } from '@/components/_shared/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import { useSessionActions } from '@/lib/hooks/session/use-session-actions';
import { useForm } from '@inertiajs/react';

function ForgotPasswordPage() {
    const { forgotPassword } = useSessionActions();

    const { post, data, setData, errors, processing } = useForm({
        _method: forgotPassword.method,
        email: '',
    });

    function handleSubmit() {
        post(forgotPassword.url);
    }

    return (
        <AuthLayout hideNav>
            <Label className="text-lg">Forgot Password</Label>
            <CompactForm onSubmit={handleSubmit} processing={processing} className="mt-6">
                <CompactFormField label="Email">
                    <FormInputLine
                        value={data.email}
                        onChange={(value) => setData('email', value)}
                        message={errors.email}
                    />
                </CompactFormField>
            </CompactForm>
        </AuthLayout>
    );
}

export default ForgotPasswordPage;
