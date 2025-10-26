import { DossierLayout } from '@/components/_shared/dossier/dossier-layout';
import { DossierContentShell } from '@/components/_shared/dossier/dossier-main';
import DossierDateField from '@/components/_shared/dossier/field/dossier-date-field';
import DossierPlainField from '@/components/_shared/dossier/field/dossier-plain-field';
import { ResourceSectionContextProvider } from '@/contexts/resource-sction-context';
import { useLocalEnum } from '@/lib/hooks/locale/useLocalEnum';
import { UserDetailResource } from '@/lib/types/models/user/user-resources';
import UserProfileDossierHeader from './user-profile-dossier-header';

function UserProfileDossier({ user }: { user: UserDetailResource }) {
    const { userRole } = useLocalEnum();

    return (
        <ResourceSectionContextProvider defaultSectionKey="baseData">
            <DossierLayout actions={{ title: 'Lietotājs', dropdown: user.actions.dropdown }}>
                <UserProfileDossierHeader user={user} />

                <DossierContentShell>
                    <DossierPlainField label="Role" value={userRole(user.data.role)} />
                    <DossierDateField label="Pievienojās" value={user.data.createdAt} />
                    <DossierDateField
                        label="Epasta verifikācijas datums"
                        value={user.data.verifiedAt}
                    />
                </DossierContentShell>
            </DossierLayout>
        </ResourceSectionContextProvider>
    );
}

export default UserProfileDossier;
