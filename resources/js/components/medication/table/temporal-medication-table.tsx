import {
    BaseTable,
    BaseTableCell,
    BaseTableHead,
    BaseTableRow,
    BaseTemporalTableImplementationProps,
} from '@/components/_shared/table/base-table';
import UserName from '@/components/_shared/user-name';
import { useCurrentUser } from '@/lib/hooks/current/use-current-user';
import { useMedicamentTypes } from '@/lib/hooks/current/use-medicament-types';
import { useLocalDate } from '@/lib/hooks/locale/useLocalDate';
import { MedicationTemp } from '@/lib/types/models/medication/medication-temp';
import { CalendarIcon, UserRoundIcon } from 'lucide-react';

type TemporalMedicationTableProps = BaseTemporalTableImplementationProps<MedicationTemp>;

function TemporalMedicationTable({
    collection,
    onItemClick,
    minimal404 = true,
    ...rest
}: TemporalMedicationTableProps) {
    const { defaultDate } = useLocalDate();
    const user = useCurrentUser();
    const medicamentTypes = useMedicamentTypes();

    return (
        <BaseTable
            title="Izsniegtie medikamenti"
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
                    <BaseTableHead className="w-[300px]">
                        <div className="flex items-center gap-2">
                            <UserRoundIcon /> Autors
                        </div>
                    </BaseTableHead>
                    <BaseTableHead>Medikaments</BaseTableHead>
                    <BaseTableHead className="w-[200px]">Apjoms</BaseTableHead>
                </>
            }
            renderRow={(item) => {
                return (
                    <BaseTableRow onClick={() => onItemClick(item)}>
                        <BaseTableCell className="font-medium">
                            {defaultDate(new Date())}
                        </BaseTableCell>
                        <BaseTableCell>
                            <UserName user={user?.data} />
                        </BaseTableCell>
                        <BaseTableCell>
                            {medicamentTypes.data.find(
                                (type) => type.data.id === item.medicamentTypeId,
                            )?.data.name ?? 'Kļūda'}
                        </BaseTableCell>
                        <BaseTableCell className="flex justify-between">
                            {item.amount}
                            <span className="text-foreground/50 text-sm">
                                {medicamentTypes.data.find(
                                    (type) => type.data.id === item.medicamentTypeId,
                                )?.data.form ?? 'Kļūda'}
                            </span>
                        </BaseTableCell>
                    </BaseTableRow>
                );
            }}
        />
    );
}

export default TemporalMedicationTable;
