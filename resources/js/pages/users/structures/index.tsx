import UserStructuresDossier from '@/components/user/dossier/user-structures-dossier';
import AppLayout from '@/layouts/app-layout';
import CentredLayout from '@/layouts/centred-layout';
import DossierPagelayout from '@/layouts/dossier-page-layout';
import { useSelectedUser } from '@/lib/hooks/selected/use-selected-user';

function UserStructuresPage() {
    const user = useSelectedUser();

    return (
        <AppLayout
        // backStack={[
        //     { label: 'Lietotāji', href: admin ? routeTo.user.index().path : undefined },
        //     { label: 'Struktūrvienības' },
        // ]}
        >
            <CentredLayout>
                <DossierPagelayout>
                    <UserStructuresDossier user={user} />
                </DossierPagelayout>
            </CentredLayout>
        </AppLayout>
    );
}

export default UserStructuresPage;
