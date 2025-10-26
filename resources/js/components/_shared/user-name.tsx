import { UserPreview } from '@/lib/types/models/user/user-preview';

function UserName({ user }: { user: UserPreview | undefined | null }) {
    return <>{user ? `${user.name} ${user.surname}` : 'Deleted User'}</>;
}

export default UserName;
