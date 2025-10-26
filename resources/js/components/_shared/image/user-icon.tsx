import { useInitials } from '@/lib/hooks/use-initials';
import { UserPreview } from '@/lib/types/models/user/user-preview';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

function UserIcon({
    user,
    className,
}: {
    user: UserPreview | undefined | null;
    className?: string;
}) {
    const initialsFactory = useInitials();
    const initials = user ? initialsFactory(`${user.name} ${user.surname}`) : 'LA';

    return (
        <Avatar className={cn('size-7', className)}>
            <AvatarImage src={user?.avatarUrl} alt="@shadcn" />
            <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
    );
}

export default UserIcon;
