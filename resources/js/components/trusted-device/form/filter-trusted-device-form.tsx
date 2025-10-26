import { BaseFormProps } from '@/components/_shared/form/base-form-props';
import FormInputDate from '@/components/_shared/form/input/form-input-date';
import {
    CompactForm,
    CompactFormField,
    CompactFormRow,
    CompactFormSection,
} from '@/components/_shared/modal/variant/write/compact-form';
import { useCurrentStructure } from '@/lib/hooks/current/use-current-structure';
import { usePagniatedTrustedDevices } from '@/lib/hooks/paginated/use-paginated-trusted-devices';
import { useForm } from '@inertiajs/react';

type FilterTrustedDeviceFormProps = BaseFormProps;

function FilterTrustedDeviceForm({ onSuccess }: FilterTrustedDeviceFormProps) {
    const { filter } = usePagniatedTrustedDevices();
    const structure = useCurrentStructure();

    const { get, data, setData, errors, processing, transform } = useForm({
        createdFrom: filter.createdFrom ? new Date(filter.createdFrom) : undefined,
        createdTo: filter.createdTo ? new Date(filter.createdTo) : undefined,
        usedFrom: filter.usedFrom ? new Date(filter.usedFrom) : undefined,
        usedTo: filter.usedTo ? new Date(filter.usedTo) : undefined,
    });

    transform(({ createdFrom, createdTo, usedFrom, usedTo }) => ({
        createdFrom: createdFrom?.toISOString().split('T')[0],
        createdTo: createdTo?.toISOString().split('T')[0],
        usedFrom: usedFrom?.toISOString().split('T')[0],
        usedTo: usedTo?.toISOString().split('T')[0],
    }));

    if (!structure) throw Error('can not proceed (no structure)');

    const action = structure.actions.devices;

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

            <CompactFormSection label="Izmantots">
                <CompactFormRow>
                    <CompactFormField label="Sākot no datuma">
                        <FormInputDate
                            value={data.usedFrom}
                            onValueChange={onFromDateChange}
                            message={errors.usedFrom}
                        />
                    </CompactFormField>

                    <CompactFormField label="Līdz datumam">
                        <FormInputDate
                            value={data.usedTo}
                            onValueChange={onToDateChange}
                            message={errors.usedTo}
                        />
                    </CompactFormField>
                </CompactFormRow>
            </CompactFormSection>
        </CompactForm>
    );
}

export default FilterTrustedDeviceForm;
