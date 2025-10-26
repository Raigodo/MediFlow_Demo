import {
    BaseTable,
    BaseTableCell,
    BaseTableHead,
    BaseTableImplementationProps,
    BaseTableRow,
} from '@/components/_shared/table/base-table';
import UserName from '@/components/_shared/user-name';
import { useModalManager } from '@/contexts/modal-manager-context';
import { useLocalDate } from '@/lib/hooks/locale/useLocalDate';
import {
    DiagnoseCollectionResource,
    DiagnosePreviewResource,
} from '@/lib/types/models/diagnose/diagnose-resources';
import { ModalKey } from '@/lib/types/values/modal-key';
import { router } from '@inertiajs/react';
import { CalendarIcon, UserRoundIcon } from 'lucide-react';

type DiagnoseTableProps = BaseTableImplementationProps<DiagnoseCollectionResource>;

function DiagnoseTable({ collection, onItemClick, showPreview, ...rest }: DiagnoseTableProps) {
    const { openModal } = useModalManager();
    const { defaultDate } = useLocalDate();

    const items = collection.data;

    function handleItemClick(diagnose: DiagnosePreviewResource) {
        if (onItemClick) onItemClick(diagnose);
        else if (showPreview) openModal({ key: ModalKey.PREVIEW_DIAGNOSE, bag: { diagnose } });
        else router.get(diagnose.actions.show.url);
    }

    return (
        <BaseTable
            title="Diagnozes"
            collection={items}
            filterModalKey={ModalKey.DIAGNOSE_FILTER}
            actions={{ title: 'Diagnozes', dropdown: collection.actions.dropdown }}
            {...rest}
            columnCount={3}
            renderHead={
                <>
                    <BaseTableHead className="w-[200px]">
                        <div className="flex items-center gap-2">
                            <CalendarIcon /> Datums
                        </div>
                    </BaseTableHead>
                    <BaseTableHead className="w-[200px]">
                        <div className="flex items-center gap-2">
                            <UserRoundIcon /> Autors
                        </div>
                    </BaseTableHead>
                    <BaseTableHead>Diagnoze</BaseTableHead>
                </>
            }
            renderRow={(item) => (
                <BaseTableRow
                    onClick={() => handleItemClick(item)}
                    actions={{ title: 'Diagnoze', dropdown: item.actions.dropdown }}
                >
                    <BaseTableCell>{defaultDate(item.data.createdAt)}</BaseTableCell>
                    <BaseTableCell className="overflow-hidden text-ellipsis whitespace-nowrap">
                        <UserName user={item.data.creator.data.user?.data} />
                    </BaseTableCell>
                    <BaseTableCell>
                        <div className="max-w-full truncate">{item.data.name}</div>
                    </BaseTableCell>
                </BaseTableRow>
            )}
        />
    );
}

export default DiagnoseTable;
