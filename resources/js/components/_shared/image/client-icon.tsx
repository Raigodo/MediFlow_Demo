import { useInitials } from '@/lib/hooks/use-initials';
import { ClientPreview } from '@/lib/types/models/client/client-preview';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

function ClientIcon({
    client,
    className,
}: {
    client: ClientPreview | undefined | null;
    className?: string;
}) {
    const initialsFactory = useInitials();
    const initials = client ? initialsFactory(`${client.name} ${client.surname}`) : 'LA';

    return (
        <Avatar className={cn('size-7', className)}>
            <AvatarImage src={client?.avatarUrl} alt="@shadcn" />
            <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
    );
}

export default ClientIcon;
