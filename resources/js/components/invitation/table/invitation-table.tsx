import {
    BaseTable,
    BaseTableCell,
    BaseTableHead,
    BaseTableImplementationProps,
    BaseTableRow,
} from '@/components/_shared/table/base-table';
import { useModalManager } from '@/contexts/modal-manager-context';
import { useLocalDate } from '@/lib/hooks/locale/useLocalDate';
import { useLocalEnum } from '@/lib/hooks/locale/useLocalEnum';
import {
    InvitationCollectionResource,
    InvitationPreviewResource,
} from '@/lib/types/models/invitation/invitation-resources';
import { ModalKey } from '@/lib/types/values/modal-key';
import { router } from '@inertiajs/react';
import { CalendarIcon } from 'lucide-react';

type InvitationsTableProps = BaseTableImplementationProps<InvitationCollectionResource>;

function InvitationsTable({
    collection,
    onItemClick,
    showPreview,
    ...rest
}: InvitationsTableProps) {
    const { openModal } = useModalManager();
    const { defaultDate } = useLocalDate();
    const { employeeRole } = useLocalEnum();

    const items = collection.data;

    function handleItemClick(invitation: InvitationPreviewResource) {
        if (onItemClick) onItemClick(invitation);
        else if (showPreview) openModal({ key: ModalKey.PREVIEW_INVITATION, bag: { invitation } });
        else router.get(invitation.actions.show.url);
    }

    return (
        <BaseTable
            title="Ielūgumi"
            collection={items}
            filterModalKey={ModalKey.INVITATION_FILTER}
            actions={{ title: 'Ielūgumi', dropdown: collection.actions.dropdown }}
            {...rest}
            columnCount={4}
            renderHead={
                <>
                    <BaseTableHead className="w-[200px]">
                        <div className="flex items-center gap-2">
                            <CalendarIcon /> Datums
                        </div>
                    </BaseTableHead>
                    <BaseTableHead className="w-[200px]">Amats</BaseTableHead>
                    <BaseTableHead className="w-[200px]">Statuss</BaseTableHead>
                    <BaseTableHead className="min-w-[8rem]">Ielūguma kods</BaseTableHead>
                </>
            }
            renderRow={(item) => (
                <BaseTableRow
                    onClick={() => handleItemClick(item)}
                    actions={{ title: 'Ielūgums', dropdown: item.actions.dropdown }}
                >
                    <BaseTableCell>{defaultDate(item.data.createdAt)}</BaseTableCell>
                    <BaseTableCell>{employeeRole(item.data.role)}</BaseTableCell>
                    <BaseTableCell>
                        {item.data.createdEmployee ? 'Izlietots' : 'Aktīvs'}
                    </BaseTableCell>
                    <BaseTableCell>{item.data.tokenValue}</BaseTableCell>
                </BaseTableRow>
            )}
        />
    );
}

export default InvitationsTable;
