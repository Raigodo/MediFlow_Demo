import { BaseFormProps } from '@/components/_shared/form/base-form-props';
import FormInputBoolean from '@/components/_shared/form/input/form-input-boolean';
import FormInputDate from '@/components/_shared/form/input/form-input-date';
import {
    CompactForm,
    CompactFormField,
    CompactFormRow,
    CompactFormSection,
} from '@/components/_shared/modal/variant/write/compact-form';
import { useCurrentUser } from '@/lib/hooks/current/use-current-user';
import { usePagniatedUsers } from '@/lib/hooks/paginated/use-paginated-users';
import { useForm } from '@inertiajs/react';

type FilterUserFormProps = BaseFormProps;

function FilterUserForm({ onSuccess }: FilterUserFormProps) {
    const user = useCurrentUser();
    const { filter } = usePagniatedUsers();

    const { get, data, setData, errors, processing, transform } = useForm({
        createdFrom: filter.createdFrom ? new Date(filter.createdFrom) : undefined,
        createdTo: filter.createdTo ? new Date(filter.createdTo) : undefined,
        archived: filter.archived ?? undefined,
        archivedFrom: filter.archivedFrom ? new Date(filter.archivedFrom) : undefined,
        archivedTo: filter.archivedTo ? new Date(filter.archivedTo) : undefined,
        verified: filter.verified ?? undefined,
    });

    if (!user) throw Error('can not preceed (No current User)');

    const action = user.actions.list;

    transform(({ createdFrom, createdTo, ...rest }) => ({
        createdFrom: createdFrom?.toISOString().split('T')[0],
        createdTo: createdTo?.toISOString().split('T')[0],
        ...rest,
    }));

    const onCreatedFromDateChange = (from: Date | undefined) => {
        setData('createdFrom', from);
        if (from && data.createdTo && from > data.createdTo) {
            setData('createdTo', undefined);
        }
    };

    const onCreatedToDateChange = (to: Date | undefined) => {
        setData('createdTo', to);
        if (to && data.createdFrom && to < data.createdFrom) {
            setData('createdFrom', undefined);
        }
    };

    const onArchivedFromDateChange = (from: Date | undefined) => {
        setData('archivedFrom', from);
        if (from && data.archivedTo && from > data.archivedTo) {
            setData('archivedTo', undefined);
        }
    };

    const onArchivedToDateChange = (to: Date | undefined) => {
        setData('archivedTo', to);
        if (to && data.archivedFrom && to < data.archivedFrom) {
            setData('archivedFrom', undefined);
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
                            onValueChange={onCreatedFromDateChange}
                            message={errors.createdFrom}
                        />
                    </CompactFormField>

                    <CompactFormField label="Līdz datumam">
                        <FormInputDate
                            value={data.createdTo}
                            onValueChange={onCreatedToDateChange}
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
                            onValueChange={onArchivedFromDateChange}
                            message={errors.archivedFrom}
                        />
                    </CompactFormField>

                    <CompactFormField label="Līdz datumam">
                        <FormInputDate
                            value={data.archivedTo}
                            onValueChange={onArchivedToDateChange}
                            message={errors.archivedTo}
                        />
                    </CompactFormField>
                </CompactFormRow>
            </CompactFormSection>

            <CompactFormSection label="Detaļas">
                <CompactFormField label="Epasta statuss">
                    <FormInputBoolean
                        value={data.archived}
                        onChange={(value: boolean | undefined) => setData('archived', value)}
                        message={errors.createdTo}
                        display={{
                            title: 'Verificēts',
                            none: 'Visi',
                            true: 'Verificēts',
                            false: 'Neverificēts',
                        }}
                    />
                </CompactFormField>
            </CompactFormSection>
        </CompactForm>
    );
}

export default FilterUserForm;
