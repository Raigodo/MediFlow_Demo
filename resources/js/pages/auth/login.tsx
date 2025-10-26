import LoginForm from '@/components/auth/form/login-form';
import AuthLayout from '@/layouts/auth-layout';

function LoginPage() {
    return (
        <AuthLayout>
            <LoginForm />
        </AuthLayout>
    );
}

export default LoginPage;
