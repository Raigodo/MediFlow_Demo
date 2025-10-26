import { BaseFormProps } from '@/components/_shared/form/base-form-props';
import FormInputDate from '@/components/_shared/form/input/form-input-date';
import FormInputNoteImportanceFlag from '@/components/_shared/form/input/form-input-note-importance-flag';
import FormSelectEmployee from '@/components/_shared/form/input/select-employee';
import {
    CompactForm,
    CompactFormField,
    CompactFormRow,
    CompactFormSection,
} from '@/components/_shared/modal/variant/write/compact-form';
import { usePagniatedNotes } from '@/lib/hooks/paginated/use-paginated-notes';
import { useSelectedClient } from '@/lib/hooks/selected/use-selected-client';
import { FilterNoteFlag } from '@/lib/types/values/filter-note-flag';
import { useForm } from '@inertiajs/react';

type FilterNoteFormProps = BaseFormProps;

function FilterNoteForm({ onSuccess }: FilterNoteFormProps) {
    const client = useSelectedClient();
    const { filter } = usePagniatedNotes();
    const action = client.actions.notes;

    const { get, data, setData, errors, processing, transform } = useForm({
        createdFrom: filter.createdFrom ? new Date(filter.createdFrom) : undefined,
        createdTo: filter.createdTo ? new Date(filter.createdTo) : undefined,
        creator: filter.creator ?? undefined,
        role: filter.role ?? undefined,
        flag: filter?.flag ?? undefined,
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

                <CompactFormField label="Svarīgums">
                    <FormInputNoteImportanceFlag
                        value={data.flag ?? FilterNoteFlag.All}
                        onChange={(value) => setData('flag', value)}
                    />
                </CompactFormField>
            </CompactFormSection>
        </CompactForm>
    );
}

export default FilterNoteForm;
