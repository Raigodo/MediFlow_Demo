import EditProfileForm from '@/components/user/form/edit-user-profile-form';
import AppLayout from '@/layouts/app-layout';
import CentredLayout from '@/layouts/centred-layout';
import DossierPagelayout from '@/layouts/dossier-page-layout';
import { useSelectedUser } from '@/lib/hooks/selected/use-selected-user';

function EditProfilePage() {
    const user = useSelectedUser();

    return (
        <AppLayout
        // backStack={[
        //     { label: 'Lietotāji', href: admin ? routeTo.user.index().path : undefined },
        //     { label: 'Rediģēt' },
        // ]}
        >
            <CentredLayout>
                <DossierPagelayout>
                    <EditProfileForm user={user} />
                </DossierPagelayout>
            </CentredLayout>
        </AppLayout>
    );
}

export default EditProfilePage;
