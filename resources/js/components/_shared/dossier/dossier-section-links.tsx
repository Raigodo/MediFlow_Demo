import { useResourceSection } from '@/contexts/resource-sction-context';
import { ResourceActionsItem } from '@/lib/types/models/reource-actions-item';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { ForwardedRef, forwardRef, ReactNode, useEffect, useState } from 'react';
import { Fragment } from 'react/jsx-runtime';
import { buttonVariants } from '../ui/button';

type DossierSectionLinksProps = {
    sections: Record<string, ResourceActionsItem>;
    className?: string;
    messages?: Record<string, string>;
};

function DossierSectionLinks({ sections, className }: DossierSectionLinksProps) {
    const filtered = Object.entries(sections)
        .filter(([, value]) => value?.can)
        .map(([key, value]) => ({
            key,
            ...value!,
        }))
        .filter((item) => item);

    return (
        <nav className={cn('flex w-fit gap-x-2', className)}>
            {filtered.map(({ key, ...action }) => (
                <Fragment key={key}>
                    <NavSectionItem action={action} className="grow">
                        {key}
                    </NavSectionItem>
                </Fragment>
            ))}
        </nav>
    );
}

type NavSectionItemProps = {
    children: ReactNode;
    className?: string;
    action: ResourceActionsItem;
};

const NavSectionItem = forwardRef(function NavItem(
    { action, children, className }: NavSectionItemProps,
    ref: ForwardedRef<HTMLAnchorElement>,
) {
    const { section: currentSection, pushSection } = useResourceSection();
    const section = (function () {
        const actionUrl = new URL(action.url, window.location.origin);
        const actionParams = new URLSearchParams(actionUrl.search);
        return actionParams.get('section') ?? '';
    })();
    const [active, setActive] = useState(currentSection === section);

    useEffect(() => {
        const reevaluated = !!section && currentSection === section;
        if (active !== reevaluated) {
            setActive(reevaluated);
        }
    }, [currentSection, section, active]);

    function handleClick(e: React.MouseEvent<Element, MouseEvent>) {
        if (!action.metadata?.preventRefresh) return;
        e.preventDefault();
        pushSection(section);
    }

    return (
        <Link
            href={action.url}
            ref={ref}
            preserveState={true}
            onClick={handleClick}
            className={cn(
                buttonVariants({ variant: 'underline', size: 'sm' }),
                active && 'border-primary border-b-4',
                'px-4.5',
                className,
            )}
        >
            {children}
        </Link>
    );
});

NavSectionItem.displayName = 'NavItem';

export { DossierSectionLinks, NavSectionItem };
