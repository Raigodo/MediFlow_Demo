import {
    BaseTable,
    BaseTableCell,
    BaseTableHead,
    BaseTableRow,
    BaseTemporalTableImplementationProps,
} from '@/components/_shared/table/base-table';
import UserName from '@/components/_shared/user-name';
import { useCurrentUser } from '@/lib/hooks/current/use-current-user';
import { useLocalDate } from '@/lib/hooks/locale/useLocalDate';
import { AmbulanceCallTemp } from '@/lib/types/models/ambulance-call/ambulance-call-temp';
import { CalendarIcon, UserRoundIcon } from 'lucide-react';

type TemporalAmbulanceCallTableProps = BaseTemporalTableImplementationProps<AmbulanceCallTemp>;

function TemporalAmbulanceCallTable({
    collection,
    onItemClick,
    minimal404 = true,
    ...rest
}: TemporalAmbulanceCallTableProps) {
    const { defaultDate } = useLocalDate();
    const user = useCurrentUser();

    return (
        <BaseTable
            title="Izsaukumi"
            collection={collection}
            minimal404={minimal404}
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
                <BaseTableRow onClick={() => onItemClick(item)}>
                    <BaseTableCell>{defaultDate(new Date())}</BaseTableCell>
                    <BaseTableCell className="overflow-hidden text-ellipsis whitespace-nowrap">
                        <UserName user={user?.data} />
                    </BaseTableCell>
                    <BaseTableCell>
                        <div className="max-w-full truncate">{item.result}</div>
                    </BaseTableCell>
                </BaseTableRow>
            )}
        />
    );
}

export default TemporalAmbulanceCallTable;
