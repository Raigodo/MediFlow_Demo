import { BaseFormProps } from '@/components/_shared/form/base-form-props';
import FormInputDate from '@/components/_shared/form/input/form-input-date';
import FormSelectEmployee from '@/components/_shared/form/input/select-employee';
import FormSelectMeasurementType from '@/components/_shared/form/input/select-measurement-type';
import {
    CompactForm,
    CompactFormField,
    CompactFormRow,
    CompactFormSection,
} from '@/components/_shared/modal/variant/write/compact-form';
import { usePagniatedMeasurements } from '@/lib/hooks/paginated/use-paginated-measurements';
import { useSelectedClient } from '@/lib/hooks/selected/use-selected-client';
import { useForm } from '@inertiajs/react';

type FilterMeasurementFormProps = BaseFormProps;

function FilterMeasurementForm({ onSuccess }: FilterMeasurementFormProps) {
    const client = useSelectedClient();
    const { filter } = usePagniatedMeasurements();
    const action = client.actions.measurements;

    const { get, data, setData, errors, processing, transform } = useForm({
        createdFrom: filter.createdFrom ? new Date(filter.createdFrom) : undefined,
        createdTo: filter.createdTo ? new Date(filter.createdTo) : undefined,
        creator: filter.creator ?? undefined,
        type: filter.type ?? undefined,
    });

    transform(({ createdFrom, createdTo, ...rest }) => ({
        createdFrom: createdFrom?.toISOString().split('T')[0],
        createdTo: createdTo?.toISOString().split('T')[0],
        ...rest,
    }));

    const onFromDateChange = (from: Date | undefined) => {
        setData('createdFrom', from);
        if (from && data.createdTo && from > data.createdTo) {
            setData('createdTo', undefined);
        }
    };

    const onToDateChange = (to: Date | undefined) => {
        setData('createdTo', to);
        if (to && data.createdFrom && to < data.createdFrom) {
            setData('createdFrom', undefined);
        }
    };

    function submit() {
        get(action.url, { onSuccess });
    }

    return (
        <CompactForm onSubmit={submit} processing={processing} className="h-full px-4 pb-4">
            <CompactFormSection label="Izveidots">
                <CompactFormRow>
                    <CompactFormField label="Sākot no datuma">
                        <FormInputDate
                            value={data.createdFrom}
                            onValueChange={onFromDateChange}
                            message={errors.createdFrom}
                        />
                    </CompactFormField>

                    <CompactFormField label="Līdz datumam">
                        <FormInputDate
                            value={data.createdTo}
                            onValueChange={onToDateChange}
                            message={errors.createdTo}
                        />
                    </CompactFormField>
                </CompactFormRow>
            </CompactFormSection>

            <CompactFormSection label="Detaļas">
                <CompactFormField label="Darbinieks">
                    <FormSelectEmployee
                        selectedId={data.creator}
                        onValueChange={(employee) => setData('creator', employee?.id)}
                        message={errors.creator}
                    />
                </CompactFormField>

                <CompactFormField label="Mērījuma tips">
                    <FormSelectMeasurementType
                        selectedId={data.type}
                        onValueChange={(type) => setData('type', type?.id)}
                        message={errors.type}
                    />
                </CompactFormField>
            </CompactFormSection>
        </CompactForm>
    );
}

export default FilterMeasurementForm;
