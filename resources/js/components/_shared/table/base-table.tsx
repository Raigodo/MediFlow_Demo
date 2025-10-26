import { FilterModalKey } from '@/lib/types/values/modal-key';
import { cn } from '@/lib/utils';
import { SearchXIcon } from 'lucide-react';
import { Fragment, ReactNode } from 'react';
import { ContextDropdown } from '../action/context/context-dropdown';
import { DropdownActions } from '../action/dropdown-actions';
import { ActionsDropdown } from '../action/dropdown/actions-dropdown';
import FilterModalTrigger from '../modal/variant/filter/filter-modal-trigger';
import { Label } from '../ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

type DataOf<T> = T extends { data: (infer U)[] } ? U : T;

export type BaseTableImplementationProps<T> = {
    collection: T;
    onItemClick?: (item: DataOf<T>) => void;
    showPreview?: boolean;
    hideTitle?: boolean;
    hideFilter?: boolean;
    hideHead?: boolean;
    hideHeader?: boolean;
    hideActions?: boolean;
    minimal404?: boolean;
};

export type BaseTemporalTableImplementationProps<T extends { id: number | string }> = {
    collection: T[];
    onItemClick: (item: T) => void;
    messages?: Record<string, string>;
    hideTitle?: boolean;
    hideFilter?: boolean;
    hideHead?: boolean;
    hideHeader?: boolean;
    hideActions?: boolean;
    minimal404?: boolean;
};

type BaseTableProps<T extends { id: number | string } | { data: { id: number | string } }> = {
    showPreview?: boolean;
    hideTitle?: boolean;
    hideFilter?: boolean;
    hideHeader?: boolean;
    hideHead?: boolean;
    hideActions?: boolean;
    minimal404?: boolean;

    collection: T[];

    title: string;

    actions?: DropdownActions;

    filterModalKey?: FilterModalKey;
    renderHead: ReactNode;
    renderRow: (item: T) => ReactNode;
    columnCount: number;
};

function BaseTable<T extends { id: number | string } | { data: { id: number | string } }>({
    collection,
    renderHead,
    renderRow,
    title,
    columnCount,
    hideTitle,
    hideFilter,
    hideHeader,
    hideHead,
    hideActions,
    filterModalKey,
    actions,
    minimal404,
}: BaseTableProps<T>) {
    return (
        <div className="h-full space-y-1.5 pt-1.5">
            {!hideHeader &&
                (!hideTitle || (!hideFilter && filterModalKey) || (!hideActions && actions)) && (
                    <div className="px-2">
                        <div className="grid grid-cols-[1fr_auto] items-center">
                            <div>{!hideTitle && <Label className="text-md">{title}</Label>}</div>
                            <div className="flex h-9 gap-x-2">
                                {!hideFilter && filterModalKey && (
                                    <FilterModalTrigger modalKey={filterModalKey} />
                                )}
                                {!hideActions && actions && <ActionsDropdown actions={actions} />}
                            </div>
                        </div>
                    </div>
                )}
            <div className="shadow">
                <Table className="table-fixed">
                    <TableHeader className={cn('bg-muted', hideHead && 'hidden')}>
                        <TableRow className="hover:bg-transparent [&_svg]:pointer-events-none [&_svg]:size-4">
                            {renderHead}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {collection?.length <= 0 &&
                            (minimal404 ? (
                                <TableRow className="hover:bg-background">
                                    <TableCell colSpan={columnCount}>
                                        <p>Nekas netika atrasts</p>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                <TableRow className="hover:bg-background">
                                    <TableCell colSpan={columnCount} className="py-8">
                                        <div className="mx-auto grid w-fit min-w-32 gap-2 text-lg">
                                            <SearchXIcon className="size-16 justify-self-center" />
                                            <p>Nekas netika atrasts</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        {collection &&
                            collection.length > 0 &&
                            collection.map((item) => (
                                <Fragment
                                    key={
                                        (item as unknown as { data: { id: number | string } })?.data
                                            ?.id ?? (item as unknown as { id: number | string }).id
                                    }
                                >
                                    {renderRow(item)}
                                </Fragment>
                            ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

function BaseTableHead({ className, children }: { className?: string; children: ReactNode }) {
    return <TableHead className={className}>{children}</TableHead>;
}

function BaseTableRow({
    className,
    children,
    actions,
    onClick,
}: {
    className?: string;
    children: ReactNode;
    actions?: DropdownActions;
    onClick?: () => void;
}) {
    return (
        <ContextDropdown
            actions={actions}
            renderTrigger={
                <TableRow onClick={onClick} className={cn('cursor-pointer', className)}>
                    {children}
                </TableRow>
            }
        />
    );
}

function BaseTableCell({
    className,
    children,
    colSpan,
}: {
    className?: string;
    children: ReactNode;
    colSpan?: number;
}) {
    return (
        <TableCell
            className={cn('overflow-hidden text-ellipsis whitespace-nowrap', className)}
            colSpan={colSpan}
        >
            {children}
        </TableCell>
    );
}

export { BaseTable, BaseTableCell, BaseTableHead, BaseTableRow };
