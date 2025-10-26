import RegisterForm from '@/components/auth/form/register-form';
import AuthLayout from '@/layouts/auth-layout';

function RegisterPage() {
    return (
        <AuthLayout>
            <RegisterForm />
        </AuthLayout>
    );
}

export default RegisterPage;
