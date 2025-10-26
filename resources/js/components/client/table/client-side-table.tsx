import ClientIcon from '@/components/_shared/image/client-icon';
import { useLocalEnum } from '@/lib/hooks/locale/useLocalEnum';
import { useOptionalSelectedClient } from '@/lib/hooks/selected/use-selected-client';
import { useClientSidelist } from '@/lib/hooks/sidelist/use-client-sidelist';
import { ClientPreview } from '@/lib/types/models/client/client-preview';
import { EmployeeRole } from '@/lib/types/values/employee-role';
import { cn } from '@/lib/utils';
import { Link, usePage } from '@inertiajs/react';
import { buttonVariants } from '../../_shared/ui/button';

function ClientSideTable() {
    const { items, client, actionKey: actionName } = useClientSidelist();

    return (
        <ul className="mx-1 overflow-x-hidden py-2">
            {items.map((item) => {
                const showRoles = item.data.id === client?.data.id;
                return (
                    <li className={cn('overflow-x-hidden', showRoles && 'mb-2')} key={item.data.id}>
                        <ShowClientLink
                            route={item.actions[actionName].url}
                            client={item.data}
                            className={cn('shadow-md', !showRoles && 'mb-3')}
                        />
                        {showRoles && <RoleList />}
                    </li>
                );
            })}
        </ul>
    );
}

export default ClientSideTable;

function RoleList() {
    const { roles } = useClientSidelist();

    return (
        <ul className="mt-1.5 mb-2 ml-12 space-y-1">
            {roles?.map((role) => (
                <li key={role}>
                    <ClientViaRoleLink role={role} />
                </li>
            ))}
        </ul>
    );
}

function ShowClientLink({
    route,
    client,
    className,
}: {
    route: string;
    client: ClientPreview;
    className?: string;
}) {
    const selectedClient = useOptionalSelectedClient();
    const isActive = selectedClient?.data && selectedClient.data.id === client.id;

    return (
        <Link
            href={route}
            className={cn(
                buttonVariants({ variant: 'outline' }),
                'block h-fit w-full py-0 text-start',
                'hover:bg-secondary rounded-[0px] rounded-r-xs border-l-2 pl-2 transition-all hover:border-l-4',
                isActive &&
                    'bg-primary hover:bg-primary hover:text-primary-foreground text-primary-foreground border-l-3',
                className,
            )}
        >
            <div className="flex items-center gap-2 py-1.5">
                <ClientIcon client={client} className="size-12" />

                <div className="min-w-0 flex-1">
                    <div className="truncate">
                        {client.name} {client.surname}
                    </div>
                    <div className="truncate font-normal">{client.id}</div>
                </div>
            </div>
        </Link>
    );
}

function ClientViaRoleLink({ role }: { role: EmployeeRole }) {
    const { role: selectedRole, client } = useClientSidelist();
    const { employeeRole } = useLocalEnum();
    const { url } = usePage();
    if (!client) throw Error('no client selected');

    const isCurrentRole = role === selectedRole;

    const [baseUrl, queryString] = url.split('?');
    const params = new URLSearchParams(queryString || '');
    params.set('role', role.toString());
    const href = `${baseUrl}?${params.toString()}`;

    return (
        <Link
            href={href}
            className={cn(
                buttonVariants({ variant: 'ghost' }),
                `w-full justify-start rounded-[0px] rounded-r-xs border-2 border-l-0 text-start shadow-md ${
                    isCurrentRole && 'bg-secondary text-secondary-foreground'
                }`,
            )}
        >
            {employeeRole(role)}
        </Link>
    );
}
