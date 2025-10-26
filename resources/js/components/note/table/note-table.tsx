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
    NoteCollectionResource,
    NotePreviewResource,
} from '@/lib/types/models/note/note-resources';
import { ModalKey } from '@/lib/types/values/modal-key';
import { cn } from '@/lib/utils';
import { router } from '@inertiajs/react';
import { CalendarIcon, CircleAlertIcon, UserRoundIcon } from 'lucide-react';

type NoteTableProps = BaseTableImplementationProps<NoteCollectionResource>;

function NoteTable({ collection, onItemClick, showPreview, ...rest }: NoteTableProps) {
    const { openModal } = useModalManager();
    const { defaultDate } = useLocalDate();

    const items = collection.data;

    function handleItemClick(note: NotePreviewResource) {
        if (onItemClick) onItemClick(note);
        else if (showPreview) openModal({ key: ModalKey.PREVIEW_NOTE, bag: { note } });
        else router.get(note.actions.show.url);
    }

    return (
        <BaseTable
            title="Ieraksti"
            collection={items}
            filterModalKey={ModalKey.NOTE_FILTER}
            actions={{ title: 'Ieraksti', dropdown: collection.actions.dropdown }}
            {...rest}
            columnCount={4}
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
                    <BaseTableHead className="w-full max-w-0">
                        <div className="truncate">Saturs</div>
                    </BaseTableHead>
                    <BaseTableHead className="w-16">
                        <div className="flex items-center justify-center">
                            <CircleAlertIcon />
                        </div>
                    </BaseTableHead>
                </>
            }
            renderRow={(item) => (
                <BaseTableRow
                    key={item.data.id}
                    onClick={() => handleItemClick(item)}
                    actions={{
                        title: 'Dienas ieraksts',
                        dropdown: item.actions.dropdown,
                    }}
                >
                    <BaseTableCell className="font-medium">
                        {defaultDate(item.data.createdAt)}
                    </BaseTableCell>
                    <BaseTableCell className="overflow-hidden text-ellipsis whitespace-nowrap">
                        <UserName user={item.data.creator.data.user?.data} />
                    </BaseTableCell>
                    <BaseTableCell className="overflow-hidden pr-4 text-ellipsis whitespace-nowrap">
                        {item.data.content}
                    </BaseTableCell>
                    <BaseTableCell>
                        <CircleAlertIcon
                            className={cn(
                                'text-secondary mx-auto',
                                item.data.isImportant && 'text-destructive',
                            )}
                            size={16}
                        />
                    </BaseTableCell>
                </BaseTableRow>
            )}
        />
    );
}

export default NoteTable;
