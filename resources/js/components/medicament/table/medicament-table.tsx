import {
    BaseTable,
    BaseTableCell,
    BaseTableHead,
    BaseTableImplementationProps,
    BaseTableRow,
} from '@/components/_shared/table/base-table';
import { useModalManager } from '@/contexts/modal-manager-context';
import {
    MedicamentCollectionResource,
    MedicamentPreviewResource,
} from '@/lib/types/models/medicament/medicament-resources';
import { ModalKey } from '@/lib/types/values/modal-key';
import { router } from '@inertiajs/react';

type MedicamentTableProps = BaseTableImplementationProps<MedicamentCollectionResource>;

function MedicamentTable({ collection, onItemClick, showPreview, ...rest }: MedicamentTableProps) {
    const { openModal } = useModalManager();

    const items = collection.data;

    function handleItemClick(medicament: MedicamentPreviewResource) {
        if (onItemClick) onItemClick(medicament);
        else if (showPreview) openModal({ key: ModalKey.PREVIEW_MEDICAMENT, bag: { medicament } });
        else router.get(medicament.actions.show.url);
    }

    return (
        <BaseTable
            title="Medikamenti"
            collection={items}
            filterModalKey={ModalKey.MEDICAMENT_FILTER}
            actions={{ title: 'Medikamenti', dropdown: collection.actions.dropdown }}
            {...rest}
            columnCount={3}
            renderHead={
                <>
                    <BaseTableHead>Nosaukums</BaseTableHead>
                    <BaseTableHead className="w-[200px]">Apjoms</BaseTableHead>
                    <BaseTableHead className="w-[200px]">Forma</BaseTableHead>
                </>
            }
            renderRow={(item) => (
                <BaseTableRow
                    onClick={() => handleItemClick(item)}
                    actions={{ title: 'Medikaments', dropdown: item.actions.dropdown }}
                >
                    <BaseTableCell>{item.data.medicamentType.data.name}</BaseTableCell>
                    <BaseTableCell>{item.data.amount}</BaseTableCell>
                    <BaseTableCell>{item.data.medicamentType.data.form}</BaseTableCell>
                </BaseTableRow>
            )}
        />
    );
}

export default MedicamentTable;
