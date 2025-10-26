import { DossierHeader } from '@/components/_shared/dossier/dossier-main';
import UserName from '@/components/_shared/user-name';
import { UserDetailResource } from '@/lib/types/models/user/user-resources';

function UserProfileDossierHeader({ user }: { user: UserDetailResource }) {
    return (
        <DossierHeader
            title={<UserName user={user?.data} />}
            subtitle={user.data.id}
            iconUrl={user.data.avatarUrl}
            sections={user.data.sections}
        />
    );
}

export default UserProfileDossierHeader;
