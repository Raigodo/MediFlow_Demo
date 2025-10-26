import AppLayout from '@/layouts/app-layout';
import DossierPagelayout from '@/layouts/dossier-page-layout';

function ChangePasswordPage() {
    return (
        <AppLayout
        // backStack={[
        //     { label: 'Lietotāji', href: admin ? routeTo.user.index().path : undefined },
        //     { label: 'Paroles maiņa' },
        // ]}
        >
            <DossierPagelayout>Change Password</DossierPagelayout>
        </AppLayout>
    );
}

export default ChangePasswordPage;
