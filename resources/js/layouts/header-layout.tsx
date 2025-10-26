import { ActionsDropdown } from '@/components/_shared/action/dropdown/actions-dropdown';
import AvailableStructureSelect from '@/components/_shared/form/input/available-structure-select';
import UserIcon from '@/components/_shared/image/user-icon';
import { Button } from '@/components/_shared/ui/button';
import { Label } from '@/components/_shared/ui/label';
import { Separator } from '@/components/_shared/ui/separator';
import ErrorBoundary from '@/components/_shared/utility/error-boundary';
import { useCurrentStructure } from '@/lib/hooks/current/use-current-structure';
import { useCurrentUser } from '@/lib/hooks/current/use-current-user';
import { useSessionActions } from '@/lib/hooks/session/use-session-actions';
import { useSessionResource } from '@/lib/hooks/session/use-session-resource';
import { StructurePreviewResource } from '@/lib/types/models/structure/structure-resources';
import { UserRole } from '@/lib/types/values/user-role';
import { useForm } from '@inertiajs/react';
import { PropsWithChildren, ReactNode, useEffect, useState } from 'react';

interface HeaderLayoutProps extends PropsWithChildren {
    title?: string | ReactNode;
}

function HeaderLayout({ children, title }: HeaderLayoutProps) {
    return (
        <div className="grid h-screen max-h-screen grid-cols-1 grid-rows-[64px_minmax(0,1fr)] overflow-hidden">
            <div className="bg-background relative z-10 py-1.5 pr-7 pl-3 shadow-xs">
                <div className="flex size-full items-center">
                    <div className="flex h-full grow items-center">
                        {!title ? (
                            <Label className="text-lg">MediFlow</Label>
                        ) : typeof title === 'string' ? (
                            <Label className="text-lg">{title}</Label>
                        ) : (
                            title
                        )}
                    </div>
                    <Separator orientation="vertical" className="mr-4" />

                    <ErrorBoundary>
                        <SessionOverview />
                    </ErrorBoundary>
                </div>

                <div className="absolute right-0 bottom-0 left-1.5 border-b" />
            </div>
            <div className="overflow-y-auto">{children}</div>
        </div>
    );
}

export default HeaderLayout;

function SessionOverview() {
    const user = useCurrentUser();
    const { dropdown } = useSessionActions();
    const session = useSessionResource();
    const isAdmin = user?.data.role === UserRole.Admin;

    const canRescope = session.data.structures.data.some((item) => item.actions.rescope.can);

    if (!user) throw Error('can not preceed (no user)');

    return (
        <div className="grid h-full grid-cols-[1fr_auto] grid-rows-2 gap-x-4 gap-y-1">
            <div className="col-start-1 row-start-1 pl-1 text-start">
                {user.data.name} {user.data.surname}
            </div>
            <div className="col-start-1 row-start-2 min-w-[50%] justify-self-end">
                {canRescope ? <StructureSelect /> : !isAdmin && <StructureLabel />}
            </div>
            <div className="col-start-2 row-span-2">
                <ActionsDropdown
                    actions={{ title: 'Sessija', dropdown: dropdown }}
                    classNames={{ content: 'w-48' }}
                >
                    <Button variant={'outline'} className="aspect-square h-full p-0">
                        <UserIcon user={user.data} className="size-full" />
                    </Button>
                </ActionsDropdown>
            </div>
        </div>
    );
}

function StructureLabel() {
    const structure = useCurrentStructure();

    return (
        <div className="text-muted-foreground size-full text-end text-sm">
            {structure?.data.name ?? 'no structure'}
        </div>
    );
}

function StructureSelect() {
    const structure = useCurrentStructure();
    const { setData, post, processing } = useForm({ structureId: structure?.data.id });
    const [selected, setSelected] = useState<StructurePreviewResource | undefined>(structure);

    function handleValueChange(value: StructurePreviewResource | undefined) {
        setData('structureId', value?.data.id);
        setSelected(value);
    }

    useEffect(() => {
        if (selected && structure?.data.id !== selected.data.id) {
            post(selected.actions.rescope.url, {
                onError: () => setSelected(structure),
            });
        }
    }, [structure, selected, post]);

    return (
        <AvailableStructureSelect
            value={structure ?? undefined}
            processing={processing}
            onValueChange={handleValueChange}
        />
    );
}
