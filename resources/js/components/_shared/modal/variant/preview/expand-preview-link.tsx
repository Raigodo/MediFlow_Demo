import { ResourceActionsItem } from '@/lib/types/models/reource-actions-item';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { Maximize2Icon } from 'lucide-react';
import { buttonVariants } from '../../../ui/button';

function ExpandPreviewLink({ action }: { action: ResourceActionsItem }) {
    return (
        <Link href={action.url} className={cn(buttonVariants({ size: 'icon' }), 'size-full')}>
            <Maximize2Icon />
        </Link>
    );
}

export default ExpandPreviewLink;
