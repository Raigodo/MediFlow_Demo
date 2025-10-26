import {
    BaseTable,
    BaseTableCell,
    BaseTableHead,
    BaseTableRow,
    BaseTemporalTableImplementationProps,
} from '@/components/_shared/table/base-table';
import UserName from '@/components/_shared/user-name';
import { useCurrentUser } from '@/lib/hooks/current/use-current-user';
import { useMeasurementTypes } from '@/lib/hooks/current/use-measurement-types';
import { useLocalDate } from '@/lib/hooks/locale/useLocalDate';
import { MeasurementTemp } from '@/lib/types/models/measurement/measurement-temp';
import { CalendarIcon, UserRoundIcon } from 'lucide-react';

type TemporalMeasurementTableProps = BaseTemporalTableImplementationProps<MeasurementTemp>;

function TemporalMeasurementTable({
    collection,
    onItemClick,
    minimal404 = true,
    ...rest
}: TemporalMeasurementTableProps) {
    const { defaultDate } = useLocalDate();
    const user = useCurrentUser();
    const measurementTypes = useMeasurementTypes();

    return (
        <BaseTable
            title={'Mērījumi'}
            collection={collection}
            minimal404={minimal404}
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
                    key={item.id}
                    onClick={() => onItemClick(item)}
                    actions={{ title: 'Mērījums', dropdown: null }}
                >
                    <BaseTableCell className="font-medium">{defaultDate(new Date())}</BaseTableCell>
                    <BaseTableCell className="overflow-hidden text-ellipsis whitespace-nowrap">
                        <UserName user={user?.data} />
                    </BaseTableCell>
                    <BaseTableCell>
                        {measurementTypes.data.find(
                            (type) => type.data.id === item.measurementTypeId,
                        )?.data.name ?? 'Kļūda'}
                    </BaseTableCell>
                    <BaseTableCell className="flex justify-between">
                        {item.value}
                        <span className="text-foreground/50 text-sm">
                            {measurementTypes.data.find(
                                (type) => type.data.id === item.measurementTypeId,
                            )?.data.units ?? 'Kļūda'}
                        </span>
                    </BaseTableCell>
                </BaseTableRow>
            )}
        />
    );
}

export default TemporalMeasurementTable;
