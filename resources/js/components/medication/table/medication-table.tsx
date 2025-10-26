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
    MedicationCollectionResource,
    MedicationPreviewResource,
} from '@/lib/types/models/medication/medication-resources';
import { ModalKey } from '@/lib/types/values/modal-key';
import { router } from '@inertiajs/react';
import { CalendarIcon, UserRoundIcon } from 'lucide-react';

type MedicationTableProps = BaseTableImplementationProps<MedicationCollectionResource>;

function MedicationTable({ collection, onItemClick, showPreview, ...rest }: MedicationTableProps) {
    const { openModal } = useModalManager();
    const { defaultDate } = useLocalDate();

    const items = collection.data;

    function handleItemClick(medication: MedicationPreviewResource) {
        if (onItemClick) onItemClick(medication);
        else if (showPreview) openModal({ key: ModalKey.PREVIEW_MEDICATION, bag: { medication } });
        else router.get(medication.actions.show.url);
    }

    return (
        <BaseTable
            title="Izsniegtie medikamenti"
            collection={items}
            filterModalKey={ModalKey.MEDICATION_FILTER}
            actions={{
                title: 'Izsniegtie medikamenti',
                dropdown: collection.actions.dropdown,
            }}
            {...rest}
            columnCount={4}
            renderHead={
                <>
                    <BaseTableHead className="w-[200px]">
                        <div className="flex items-center gap-2">
                            <CalendarIcon /> Datums
                        </div>
                    </BaseTableHead>
                    <BaseTableHead className="w-[300px]">
                        <div className="flex items-center gap-2">
                            <UserRoundIcon /> Autors
                        </div>
                    </BaseTableHead>
                    <BaseTableHead>Medikaments</BaseTableHead>
                    <BaseTableHead className="w-[200px]">Apjoms</BaseTableHead>
                </>
            }
            renderRow={(item) => (
                <BaseTableRow
                    onClick={() => handleItemClick(item)}
                    actions={{
                        title: 'zsniegtais medikaments',
                        dropdown: item.actions.dropdown,
                    }}
                >
                    <BaseTableCell className="font-medium">
                        {defaultDate(item.data.createdAt)}
                    </BaseTableCell>
                    <BaseTableCell>
                        <UserName user={item.data.creator.data.user?.data} />
                    </BaseTableCell>
                    <BaseTableCell>
                        {item.data.medicament.data.medicamentType.data.name}
                    </BaseTableCell>
                    <BaseTableCell className="flex justify-between">
                        {item.data.amount}
                        <span className="text-foreground/50 text-sm">
                            {item.data.medicament.data.medicamentType.data.form}
                        </span>
                    </BaseTableCell>
                </BaseTableRow>
            )}
        />
    );
}

export default MedicationTable;
