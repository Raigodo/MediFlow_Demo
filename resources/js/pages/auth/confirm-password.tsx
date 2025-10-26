import FormInputLine from '@/components/_shared/form/input/form-input-line';
import {
    CompactForm,
    CompactFormField,
} from '@/components/_shared/modal/variant/write/compact-form';
import { Label } from '@/components/_shared/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import { useForm } from '@inertiajs/react';

function ConfirmPasswordPage() {
    // const {} = useSessionActions();

    const { data, setData, errors, processing } = useForm({
        // _method: forgotPassword.method,
        password: '',
    });

    function handleSubmit() {
        // post(forgotPassword.url);
    }

    return (
        <AuthLayout hideNav>
            <Label className="text-lg">Forgot Password</Label>
            <CompactForm onSubmit={handleSubmit} processing={processing} className="mt-6">
                <CompactFormField label="Email">
                    <FormInputLine
                        value={data.password}
                        onChange={(value) => setData('password', value)}
                        message={errors.password}
                    />
                </CompactFormField>
            </CompactForm>
        </AuthLayout>
    );
}

export default ConfirmPasswordPage;
