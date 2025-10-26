import {
    BaseTable,
    BaseTableCell,
    BaseTableHead,
    BaseTableImplementationProps,
    BaseTableRow,
} from '@/components/_shared/table/base-table';
import { useModalManager } from '@/contexts/modal-manager-context';
import { useCurrentStructure } from '@/lib/hooks/current/use-current-structure';
import { useLocalDate } from '@/lib/hooks/locale/useLocalDate';
import {
    TrustedDeviceCollectionResource,
    TrustedDevicePreviewResource,
} from '@/lib/types/models/trusted-device/trusted-device-resources';
import { ModalKey } from '@/lib/types/values/modal-key';
import { router } from '@inertiajs/react';
import { CalendarIcon } from 'lucide-react';

type DeviceTableProps = BaseTableImplementationProps<TrustedDeviceCollectionResource>;

function DeviceTable({ collection, onItemClick, showPreview, ...rest }: DeviceTableProps) {
    const { openModal } = useModalManager();
    const { defaultDate } = useLocalDate();

    const items = collection.data;

    const structure = useCurrentStructure();
    if (!structure) throw Error('can not proceed (no structure)');

    function handleItemClick(device: TrustedDevicePreviewResource) {
        if (onItemClick) onItemClick(device);
        else if (showPreview) openModal({ key: ModalKey.PREVIEW_DEVICE, bag: { device } });
        else router.get(device.actions.show.url);
    }

    return (
        <BaseTable
            title="Trusted Devices"
            collection={items}
            filterModalKey={ModalKey.TRUSTED_DEVICE_FILTER}
            actions={{ title: 'Trusted Devices', dropdown: collection.actions.dropdown }}
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
                            <CalendarIcon /> Piekļuves datums
                        </div>
                    </BaseTableHead>
                    <BaseTableHead>Piezīme</BaseTableHead>
                </>
            }
            renderRow={(item) => (
                <BaseTableRow
                    onClick={() => handleItemClick(item)}
                    actions={{ title: 'Trusted Device', dropdown: item.actions.dropdown }}
                >
                    <BaseTableCell>{defaultDate(item.data.createdAt)}</BaseTableCell>
                    <BaseTableCell>{defaultDate(item.data.lastUsedAt)}</BaseTableCell>
                    <BaseTableCell>
                        <div className="max-w-full truncate">{item.data.note}</div>
                    </BaseTableCell>
                </BaseTableRow>
            )}
        />
    );
}

export default DeviceTable;
