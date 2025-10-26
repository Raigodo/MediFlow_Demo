import UserProfileDossier from '@/components/user/dossier/user-profile-dossier';
import AppLayout from '@/layouts/app-layout';
import CentredLayout from '@/layouts/centred-layout';
import DossierPagelayout from '@/layouts/dossier-page-layout';
import { useSelectedUser } from '@/lib/hooks/selected/use-selected-user';

function ShowUserPage() {
    const user = useSelectedUser();

    return (
        <AppLayout
        // backStack={[
        //     { label: 'Lietotāji', href: admin ? routeTo.user.index().path : undefined },
        //     { label: 'Skatīt' },
        // ]}
        >
            <CentredLayout>
                <DossierPagelayout>
                    <UserProfileDossier user={user} />
                </DossierPagelayout>
            </CentredLayout>
        </AppLayout>
    );
}

export default ShowUserPage;
