import { useInitials } from '@/lib/hooks/use-initials';
import { StructurePreview } from '@/lib/types/models/structure/structure-preview';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

function StructureIcon({
    structure,
    className,
}: {
    structure: StructurePreview | undefined | null;
    className?: string;
}) {
    const initialsFactory = useInitials();
    const initials = structure ? initialsFactory(structure.name) : 'SB';

    return (
        <Avatar className={cn('size-7', className)}>
            <AvatarImage src={structure?.iconUrl} alt="@shadcn" />
            <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
    );
}

export default StructureIcon;
