import { BaseFormProps } from '@/components/_shared/form/base-form-props';
import FormInputDate from '@/components/_shared/form/input/form-input-date';
import {
    CompactForm,
    CompactFormField,
    CompactFormRow,
    CompactFormSection,
} from '@/components/_shared/modal/variant/write/compact-form';
import { useCurrentStructure } from '@/lib/hooks/current/use-current-structure';
import { usePagniatedClients } from '@/lib/hooks/paginated/use-paginated-clients';
import { useForm } from '@inertiajs/react';

type FilterClientFormProps = BaseFormProps;

function FilterClientForm({ onSuccess }: FilterClientFormProps) {
    const structure = useCurrentStructure();
    const { filter } = usePagniatedClients();

    const { get, data, setData, errors, processing, transform } = useForm({
        createdFrom: filter.createdFrom ? new Date(filter.createdFrom) : undefined,
        createdTo: filter.createdTo ? new Date(filter.createdTo) : undefined,
        archivedFrom: filter.archivedFrom ? new Date(filter.archivedFrom) : undefined,
        archivedTo: filter.archivedTo ? new Date(filter.archivedTo) : undefined,
    });

    if (!structure) throw Error('can not preceed (no structure)');

    const action = structure.actions.clients;

    transform(({ createdFrom, createdTo, archivedFrom, archivedTo, ...rest }) => ({
        createdFrom: createdFrom?.toISOString().split('T')[0],
        createdTo: createdTo?.toISOString().split('T')[0],
        archivedFrom: archivedFrom?.toISOString().split('T')[0],
        archivedTo: archivedTo?.toISOString().split('T')[0],
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

            <CompactFormSection label="Arhivēts">
                <CompactFormRow>
                    <CompactFormField label="Sākot no datuma">
                        <FormInputDate
                            value={data.archivedFrom}
                            onValueChange={onFromDateChange}
                            message={errors.archivedFrom}
                        />
                    </CompactFormField>

                    <CompactFormField label="Līdz datumam">
                        <FormInputDate
                            value={data.archivedTo}
                            onValueChange={onToDateChange}
                            message={errors.archivedTo}
                        />
                    </CompactFormField>
                </CompactFormRow>
            </CompactFormSection>
        </CompactForm>
    );
}

export default FilterClientForm;
