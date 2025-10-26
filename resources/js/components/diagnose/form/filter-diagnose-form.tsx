import { BaseFormProps } from '@/components/_shared/form/base-form-props';
import FormInputBoolean from '@/components/_shared/form/input/form-input-boolean';
import FormInputDate from '@/components/_shared/form/input/form-input-date';
import FormSelectEmployee from '@/components/_shared/form/input/select-employee';
import {
    CompactForm,
    CompactFormField,
    CompactFormRow,
    CompactFormSection,
} from '@/components/_shared/modal/variant/write/compact-form';
import { usePagniatedDiagnoses } from '@/lib/hooks/paginated/use-paginated-diagnoses';
import { useSelectedClient } from '@/lib/hooks/selected/use-selected-client';
import { useForm } from '@inertiajs/react';

type FilterDiagnoseFormProps = BaseFormProps;

function FilterDiagnoseForm({ onSuccess }: FilterDiagnoseFormProps) {
    const client = useSelectedClient();
    const { filter } = usePagniatedDiagnoses();
    const action = client.actions.diagnoses;

    const { get, data, setData, errors, processing, transform } = useForm({
        createdFrom: filter.createdFrom ? new Date(filter.createdFrom) : undefined,
        createdTo: filter.createdTo ? new Date(filter.createdTo) : undefined,
        archived: filter.archived ?? undefined,
        archivedFrom: filter.archivedFrom ? new Date(filter.archivedFrom) : undefined,
        archivedTo: filter.archivedTo ? new Date(filter.archivedTo) : undefined,
        creator: filter.creator ?? undefined,
    });

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
                <CompactFormField label="Statuss">
                    <FormInputBoolean
                        value={data.archived}
                        onChange={(value: boolean | undefined) => setData('archived', value)}
                        message={errors.createdTo}
                        display={{
                            title: 'Statuss',
                            none: 'Visi',
                            true: 'Arhivēts',
                            false: 'Aktīvs',
                        }}
                    />
                </CompactFormField>

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

            <CompactFormSection label="Detaļas">
                <CompactFormField label="Izveidoja">
                    <FormSelectEmployee
                        selectedId={data.creator}
                        onValueChange={(employee) => setData('creator', employee?.id)}
                        message={errors.creator}
                    />
                </CompactFormField>
            </CompactFormSection>
        </CompactForm>
    );
}

export default FilterDiagnoseForm;
