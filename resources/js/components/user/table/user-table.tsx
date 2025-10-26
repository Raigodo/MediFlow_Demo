import UserIcon from '@/components/_shared/image/user-icon';
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
import { useLocalEnum } from '@/lib/hooks/locale/useLocalEnum';
import {
    UserCollectionResource,
    UserPreviewResource,
} from '@/lib/types/models/user/user-resources';
import { ModalKey } from '@/lib/types/values/modal-key';
import { router } from '@inertiajs/react';

type UserTableProps = BaseTableImplementationProps<UserCollectionResource>;

function UserTable({ collection, onItemClick, showPreview, ...rest }: UserTableProps) {
    const { openModal } = useModalManager();
    const { defaultDate } = useLocalDate();
    const { userRole } = useLocalEnum();

    const items = collection.data;

    function handleItemClick(user: UserPreviewResource) {
        if (onItemClick) onItemClick(user);
        else if (showPreview) openModal({ key: ModalKey.PREVIEW_USER, bag: { user } });
        else router.get(user.actions.show.url);
    }

    return (
        <BaseTable
            title="Lietotāji"
            collection={items}
            filterModalKey={ModalKey.USER_FILTER}
            actions={{ title: 'Lietotāji', dropdown: collection.actions.dropdown }}
            {...rest}
            columnCount={3}
            renderHead={
                <>
                    <BaseTableHead className="w-[200px]">Pievienošanās Datums</BaseTableHead>
                    <BaseTableHead className="min-w-[8rem]">Vārds Uzvārds</BaseTableHead>
                    <BaseTableHead className="w-[200px]">Amats</BaseTableHead>
                </>
            }
            renderRow={(item) => (
                <BaseTableRow
                    onClick={() => handleItemClick(item)}
                    actions={{ title: 'Lietotājs', dropdown: item.actions.dropdown }}
                >
                    <BaseTableCell>{defaultDate(item.data.createdAt)}</BaseTableCell>
                    <BaseTableCell className="py-0">
                        <div className="flex items-center gap-3 py-1">
                            <UserIcon user={item.data} />
                            <UserName user={item.data} />
                        </div>
                    </BaseTableCell>
                    <BaseTableCell>{userRole(item.data.role)}</BaseTableCell>
                </BaseTableRow>
            )}
        />
    );
}

export default UserTable;
