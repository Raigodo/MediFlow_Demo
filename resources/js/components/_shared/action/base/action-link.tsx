import { useModalManager } from '@/contexts/modal-manager-context';
import { ResourceActionsItem } from '@/lib/types/models/reource-actions-item';
import { ModalKey } from '@/lib/types/values/modal-key';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { forwardRef, ReactNode } from 'react';
import { buttonVariants } from '../../ui/button';

export type ActionLinkVariants = 'dropdown' | 'standalone';

export type ActionLinkProps = {
    className?: string;
    children: ReactNode;
    variant: ActionLinkVariants;
    action: ResourceActionsItem;
};

const ActionLink = forwardRef<HTMLLinkElement, ActionLinkProps>(
    ({ action, className, children, variant }, ref) => {
        const { openModal } = useModalManager();

        function handleClick(e: React.MouseEvent<Element, MouseEvent>) {
            if (!action.metadata?.preventRefresh) return;
            e.preventDefault();
            if (action.metadata.modal)
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                openModal({ key: action.metadata.modal as ModalKey, bag: {} as any } as any);
        }

        return (
            <Link
                ref={ref}
                href={action.url}
                onClick={handleClick}
                className={cn(
                    buttonVariants({
                        variant: variant === 'dropdown' ? 'ghost' : 'secondary',
                        size: 'sm',
                    }),
                    variant === 'dropdown' &&
                        'w-full items-start justify-start text-start font-normal',
                    variant === 'standalone' && 'bg-muted px-4',
                    className,
                )}
            >
                {children}
            </Link>
        );
    },
);

export default ActionLink;
