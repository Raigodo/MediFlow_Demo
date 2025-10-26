import i18next from 'i18next';
import { MoreVerticalIcon } from 'lucide-react';
import { ReactNode } from 'react';
import { Button } from '../../ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../../ui/dropdown-menu';
import ErrorBoundary from '../../utility/error-boundary';
import { DropdownActions } from '../dropdown-actions';
import ActionsDropdownInlineForm from './actions-dropdown-inline-form';
import ActionsDropdownLink from './actions-dropdown-link';
import ActionsDropdownModalTrigger from './actions-dropdown-modal-trigger';
import ActionsDropdownSection from './actions-dropdown-section';

export type ActionsDropdownProps = {
    children?: ReactNode;
    actions?: DropdownActions;
    classNames?: { content?: string };
};

function ActionsDropdown({ actions, children }: ActionsDropdownProps) {
    if (!actions) return null;

    const filtered = Object.entries(actions?.dropdown ?? {})
        .filter(([, value]) => value?.can)
        .map(([key, value]) => ({
            key,
            ...value!,
        }))
        .filter((item) => item);

    return (
        filtered.length > 0 && (
            <ActionsDropdownShell title={actions.title} renderTrigger={children}>
                <ErrorBoundary>
                    {filtered.map((action) => {
                        if (action.method === 'GET')
                            return (
                                <ActionsDropdownLink key={action.key} action={action}>
                                    {i18next.t(action.key)}
                                </ActionsDropdownLink>
                            );
                        if (action.method)
                            return (
                                <ActionsDropdownInlineForm key={action.key} action={action}>
                                    {i18next.t(action.key)}
                                </ActionsDropdownInlineForm>
                            );
                    })}
                </ErrorBoundary>
            </ActionsDropdownShell>
        )
    );
}

export type ActionsDropdownShellProps = {
    className?: string;
    children?: ReactNode;
    title: string;
    renderTrigger?: ReactNode;
    classNames?: { content?: string };
};

function ActionsDropdownShell({
    className,
    children,
    title,
    renderTrigger,
    classNames,
}: ActionsDropdownShellProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className={className} asChild>
                {renderTrigger || (
                    <Button variant={'ghost'} size={'icon'} className={className}>
                        <MoreVerticalIcon />
                    </Button>
                )}
            </DropdownMenuTrigger>
            <DropdownMenuContent
                collisionPadding={20}
                sideOffset={8}
                className={classNames?.content}
            >
                <DropdownMenuLabel>{title}</DropdownMenuLabel>
                <DropdownMenuSeparator />

                {children}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export {
    ActionsDropdown,
    ActionsDropdownInlineForm,
    ActionsDropdownLink,
    ActionsDropdownModalTrigger,
    ActionsDropdownSection,
    ActionsDropdownShell,
};
