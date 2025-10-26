import ClientIcon from '@/components/_shared/image/client-icon';
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
    ClientCollectionResource,
    ClientPreviewResource,
} from '@/lib/types/models/client/client-resources';
import { ModalKey } from '@/lib/types/values/modal-key';
import { router } from '@inertiajs/react';

type ArchivedClientTableProps = BaseTableImplementationProps<ClientCollectionResource>;

function ArchivedClientTable({
    collection,
    onItemClick,
    showPreview,
    ...rest
}: ArchivedClientTableProps) {
    const { openModal } = useModalManager();
    const { defaultDate } = useLocalDate();

    const items = collection.data;

    function handleItemClick(client: ClientPreviewResource) {
        if (onItemClick) onItemClick(client);
        else if (showPreview) openModal({ key: ModalKey.PREVIEW_CLIENT, bag: { client } });
        else router.get(client.actions.show.url);
    }

    return (
        <BaseTable
            title="Arhivētie Klienti"
            collection={items}
            filterModalKey={ModalKey.CLIENT_FILTER}
            actions={{ title: 'Diagnozes', dropdown: collection.actions.dropdown }}
            {...rest}
            columnCount={2}
            renderHead={
                <>
                    <BaseTableHead className="w-[200px]">Pievienošanās datums</BaseTableHead>
                    <BaseTableHead>Vārds Uzvārds</BaseTableHead>
                </>
            }
            renderRow={(item) => (
                <BaseTableRow
                    onClick={() => handleItemClick(item)}
                    actions={{ title: 'Arhivētais klients', dropdown: item.actions.dropdown }}
                >
                    <BaseTableCell className="py-0">
                        {defaultDate(item.data.joinedOn)}
                    </BaseTableCell>
                    <BaseTableCell className="py-0">
                        <div className="flex w-fit items-center gap-3 py-1">
                            <ClientIcon client={item.data} />
                            <span>
                                {item.data.name} {item.data.surname}
                            </span>
                        </div>
                    </BaseTableCell>
                </BaseTableRow>
            )}
        />
    );
}

export default ArchivedClientTable;
