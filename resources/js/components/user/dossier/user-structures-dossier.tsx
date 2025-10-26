import { DossierLayout } from '@/components/_shared/dossier/dossier-layout';
import { DossierContentTable } from '@/components/_shared/dossier/dossier-main';
import StructureTable from '@/components/structure/table/structure-table';
import { ResourceSectionContextProvider } from '@/contexts/resource-sction-context';
import { usePagniatedStructures } from '@/lib/hooks/paginated/use-paginated-structures';
import { UserDetailResource } from '@/lib/types/models/user/user-resources';
import UserProfileDossierHeader from './user-profile-dossier-header';

function UserStructuresDossier({ user }: { user: UserDetailResource }) {
    const { collection, filter, ...rest } = usePagniatedStructures();

    return (
        <ResourceSectionContextProvider defaultSectionKey="structures">
            <DossierLayout actions={{ title: 'User', dropdown: user.actions.dropdown }}>
                <UserProfileDossierHeader user={user} />
                <DossierContentTable pagination={rest} paginationBag={filter}>
                    <StructureTable collection={collection} />
                </DossierContentTable>
            </DossierLayout>
        </ResourceSectionContextProvider>
    );
}

export default UserStructuresDossier;
