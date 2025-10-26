import {
    BaseTable,
    BaseTableCell,
    BaseTableHead,
    BaseTableImplementationProps,
    BaseTableRow,
} from '@/components/_shared/table/base-table';
import { useModalManager } from '@/contexts/modal-manager-context';
import { useLocalDate } from '@/lib/hooks/locale/useLocalDate';
import {
    StructureCollectionResource,
    StructurePreviewResource,
} from '@/lib/types/models/structure/structure-resources';
import { ModalKey } from '@/lib/types/values/modal-key';
import { router } from '@inertiajs/react';

type StructureTableProps = BaseTableImplementationProps<StructureCollectionResource>;

function StructureTable({ collection, onItemClick, showPreview, ...rest }: StructureTableProps) {
    const { openModal } = useModalManager();
    const { defaultDate } = useLocalDate();

    const items = collection.data;

    function handleItemClick(structure: StructurePreviewResource) {
        if (onItemClick) onItemClick(structure);
        else if (showPreview) openModal({ key: ModalKey.PREVIEW_STRUCTURE, bag: { structure } });
        else router.get(structure.actions.show.url);
    }

    return (
        <BaseTable
            title="Struktūrvienības"
            collection={items}
            filterModalKey={ModalKey.STRUCTURES_FILTER}
            actions={{ title: 'Struktūrvienības', dropdown: collection.actions.dropdown }}
            {...rest}
            columnCount={3}
            renderHead={
                <>
                    <BaseTableHead className="w-[200px]">Izveidošanas Datums</BaseTableHead>
                    <BaseTableHead className="min-w-[8rem]">Nosaukums</BaseTableHead>
                    <BaseTableHead className="w-[200px]">Statuss</BaseTableHead>
                </>
            }
            renderRow={(item) => (
                <BaseTableRow
                    onClick={() => handleItemClick(item)}
                    actions={{ title: 'Struktūrvienība', dropdown: item.actions.dropdown }}
                >
                    <BaseTableCell>{defaultDate(item.data.createdAt)}</BaseTableCell>
                    <BaseTableCell>{item.data.name}</BaseTableCell>
                    <BaseTableCell>Aktīva</BaseTableCell>
                </BaseTableRow>
            )}
        />
    );
}

export default StructureTable;
