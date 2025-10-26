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
    AmbulanceCallCollectionResource,
    AmbulanceCallPreviewResource,
} from '@/lib/types/models/ambulance-call/ambulance-call-resources';
import { ModalKey } from '@/lib/types/values/modal-key';
import { router } from '@inertiajs/react';
import { CalendarIcon, UserRoundIcon } from 'lucide-react';

type AmbulanceCallTableProps = BaseTableImplementationProps<AmbulanceCallCollectionResource>;

function AmbulanceCallTable({
    collection,
    onItemClick,
    showPreview,
    ...rest
}: AmbulanceCallTableProps) {
    const { openModal } = useModalManager();
    const { defaultDate } = useLocalDate();

    const items = collection.data;

    function handleItemClick(ambulanceCall: AmbulanceCallPreviewResource) {
        if (onItemClick) onItemClick(ambulanceCall);
        else if (showPreview)
            openModal({
                key: ModalKey.PREVIEW_AMBULANCE_CALL,
                bag: { ambulanceCall },
            });
        else router.get(ambulanceCall.actions.show.url);
    }

    return (
        <BaseTable
            title="Izsaukumi"
            collection={items}
            filterModalKey={ModalKey.AMBULANCE_CALL_FILTER}
            actions={{ title: 'Izsaukumi', dropdown: collection.actions.dropdown }}
            {...rest}
            columnCount={3}
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
                    <BaseTableHead className="w-[200px]">Result</BaseTableHead>
                </>
            }
            renderRow={(item) => (
                <BaseTableRow
                    onClick={() => handleItemClick(item)}
                    actions={{
                        title: 'Ātrās palīdzības izsaukums',
                        dropdown: item.actions.dropdown,
                    }}
                >
                    <BaseTableCell>{defaultDate(item.data.createdAt)}</BaseTableCell>
                    <BaseTableCell className="overflow-hidden text-ellipsis whitespace-nowrap">
                        <UserName user={item.data.creator.data.user?.data} />
                    </BaseTableCell>
                    <BaseTableCell>
                        <div className="max-w-full truncate">{item.data.result}</div>
                    </BaseTableCell>
                </BaseTableRow>
            )}
        />
    );
}

export default AmbulanceCallTable;
