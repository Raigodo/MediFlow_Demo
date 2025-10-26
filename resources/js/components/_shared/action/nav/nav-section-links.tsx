import { ResourceActionsItem } from '@/lib/types/models/reource-actions-item';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import i18next from 'i18next';
import { ForwardedRef, forwardRef, Fragment, ReactNode } from 'react';
import { ButtonVariant, buttonVariants } from '../../ui/button';
import { ScrollArea, ScrollBar } from '../../ui/scroll-area';

type NavSectionLinksProps = {
    sections: Record<string, ResourceActionsItem>;
    className?: string;
    classNames?: { item?: string };
    variant?: ButtonVariant;
};

function NavSectionLinks({
    sections,
    className,
    classNames,
    variant = 'underline',
}: NavSectionLinksProps) {
    const currentUrl = window.location.href;
    const filtered = Object.entries(sections)
        .filter(([, value]) => value?.can)
        .map(([key, value]) => ({
            key,
            ...value!,
        }))
        .filter((item) => item);

    return (
        <div className="grid w-full grid-cols-1">
            <ScrollArea className="pb-1.5">
                <ScrollBar orientation="horizontal" />
                <nav className={cn('flex w-full gap-x-2', className)}>
                    {filtered.map(({ key, ...action }) => {
                        const isActive = currentUrl.startsWith(action.url);
                        return (
                            <Fragment key={key}>
                                <NavSectionItem
                                    action={action}
                                    className={cn('grow', classNames?.item)}
                                    isActive={isActive}
                                    variant={variant}
                                >
                                    {i18next.t(key)}
                                </NavSectionItem>
                            </Fragment>
                        );
                    })}
                </nav>
            </ScrollArea>
        </div>
    );
}

type NavSectionItemProps = {
    children: ReactNode;
    className?: string;
    isActive: boolean;
    action: ResourceActionsItem;
    variant: ButtonVariant;
};

const NavSectionItem = forwardRef(function NavItem(
    { action, children, className, isActive, variant }: NavSectionItemProps,
    ref: ForwardedRef<HTMLAnchorElement>,
) {
    function handleClick(e: React.MouseEvent<Element, MouseEvent>) {
        if (!action.metadata?.preventRefresh) return;
        e.preventDefault();
        window.history.pushState({}, '', action.url);
    }

    return (
        <Link
            href={action.url}
            ref={ref}
            preserveState={true}
            onClick={handleClick}
            className={cn(
                buttonVariants({ variant, size: 'sm' }),
                variant !== 'underline' && !isActive && 'bg-secondary hover:bg-secondary/80',
                variant === 'underline' && isActive && 'border-primary border-b-4',
                'grow px-4.5',
                className,
            )}
        >
            {children}
        </Link>
    );
});

NavSectionItem.displayName = 'NavItem';

export { NavSectionItem, NavSectionLinks };
