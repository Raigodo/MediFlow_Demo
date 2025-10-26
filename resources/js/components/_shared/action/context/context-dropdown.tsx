import i18next from 'i18next';
import { MoreVerticalIcon } from 'lucide-react';
import { ReactNode } from 'react';
import { Button } from '../../../../components/_shared/ui/button';
import ErrorBoundary from '../../../../components/_shared/utility/error-boundary';
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuLabel,
    ContextMenuSeparator,
    ContextMenuTrigger,
} from '../../ui/context-menu';
import { DropdownActions } from '../dropdown-actions';
import ContextDropdownInlineForm from './context-dropdown-inline-form';
import ContextDropdownLink from './context-dropdown-link';
import ContextDropdownModalTrigger from './context-dropdown-modal-trigger';
import ContextDropdownSection from './context-dropdown-section';

function ContextDropdown({
    renderTrigger,
    actions,
}: {
    actions?: DropdownActions;
    renderTrigger?: ReactNode;
}) {
    if (!actions) return renderTrigger;

    const filtered = Object.entries(actions?.dropdown ?? {})
        .filter(([, value]) => value?.can)
        .map(([key, value]) => ({
            key,
            ...value!,
        }))
        .filter((item) => item);

    if (filtered.length <= 0) return renderTrigger;

    return (
        <ContextDropdownShell title={actions.title} renderTrigger={renderTrigger}>
            <ErrorBoundary>
                {filtered.map((action) => {
                    if (action.method === 'GET')
                        return (
                            <ContextDropdownLink key={action.key} action={action}>
                                {i18next.t(action.key)}
                            </ContextDropdownLink>
                        );
                    if (action.method)
                        return (
                            <ContextDropdownInlineForm key={action.key} action={action}>
                                {i18next.t(action.key)}
                            </ContextDropdownInlineForm>
                        );
                })}
            </ErrorBoundary>
        </ContextDropdownShell>
    );
}

function ContextDropdownShell({
    className,
    children,
    title,
    renderTrigger,
}: {
    className?: string;
    children?: ReactNode;
    title: string;
    renderTrigger?: ReactNode;
}) {
    return (
        <ContextMenu>
            <ContextMenuTrigger className={className} asChild>
                {renderTrigger || (
                    <Button variant={'ghost'} size={'icon'} className={className}>
                        <MoreVerticalIcon />
                    </Button>
                )}
            </ContextMenuTrigger>

            <ContextMenuContent collisionPadding={20}>
                <ContextMenuLabel>{title}</ContextMenuLabel>
                <ContextMenuSeparator />

                {children}
            </ContextMenuContent>
        </ContextMenu>
    );
}

export {
    ContextDropdown,
    ContextDropdownInlineForm,
    ContextDropdownLink,
    ContextDropdownModalTrigger,
    ContextDropdownSection,
    ContextDropdownShell,
};
