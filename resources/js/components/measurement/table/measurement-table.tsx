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
    MeasurementCollectionResource,
    MeasurementPreviewResource,
} from '@/lib/types/models/measurement/measurement-resources';
import { ModalKey } from '@/lib/types/values/modal-key';
import { router } from '@inertiajs/react';
import { CalendarIcon, UserRoundIcon } from 'lucide-react';

type MeasurementTableProps = BaseTableImplementationProps<MeasurementCollectionResource>;

function MeasurementTable({
    collection,
    onItemClick,
    showPreview,
    ...rest
}: MeasurementTableProps) {
    const { openModal } = useModalManager();
    const { defaultDate } = useLocalDate();

    const items = collection.data;

    function handleItemClick(measurement: MeasurementPreviewResource) {
        if (onItemClick) onItemClick(measurement);
        else if (showPreview)
            openModal({
                key: ModalKey.PREVIEW_MEASUREMENT,
                bag: { measurement },
            });
        else router.get(measurement.actions.show.url);
    }

    return (
        <BaseTable
            title="Mērījumi"
            collection={items}
            filterModalKey={ModalKey.MEASUREMENT_FILTER}
            actions={{ title: 'Mērījumi', dropdown: collection.actions.dropdown }}
            {...rest}
            columnCount={4}
            renderHead={
                <>
                    <BaseTableHead className="w-[200px]">
                        <div className="flex items-center gap-2">
                            <CalendarIcon /> Datums
                        </div>
                    </BaseTableHead>
                    <BaseTableHead>
                        <div className="flex items-center gap-2">
                            <UserRoundIcon /> Autors
                        </div>
                    </BaseTableHead>
                    <BaseTableHead className="w-[300px]">Mērījums</BaseTableHead>
                    <BaseTableHead className="w-[200px]">Vērtība</BaseTableHead>
                </>
            }
            renderRow={(item) => (
                <BaseTableRow
                    onClick={() => handleItemClick(item)}
                    actions={{ title: 'Mērījums', dropdown: item.actions.dropdown }}
                >
                    <BaseTableCell className="font-medium">
                        {defaultDate(item.data.createdAt)}
                    </BaseTableCell>
                    <BaseTableCell className="overflow-hidden text-ellipsis whitespace-nowrap">
                        <UserName user={item.data.creator.data.user?.data} />
                    </BaseTableCell>
                    <BaseTableCell>{item.data.measurementType.data.name}</BaseTableCell>
                    <BaseTableCell className="flex justify-between">
                        {item.data.value}
                        <span className="text-foreground/50 text-sm">
                            {item.data.measurementType.data.units}
                        </span>
                    </BaseTableCell>
                </BaseTableRow>
            )}
        />
    );
}

export default MeasurementTable;
