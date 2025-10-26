import { BaseFormProps } from '@/components/_shared/form/base-form-props';
import FormInputDate from '@/components/_shared/form/input/form-input-date';
import FormInputUserRole from '@/components/_shared/form/input/form-input-user-role';
import {
    CompactForm,
    CompactFormField,
    CompactFormRow,
    CompactFormSection,
} from '@/components/_shared/modal/variant/write/compact-form';
import { usePagniatedStructures } from '@/lib/hooks/paginated/use-paginated-structures';
import { useSelectedUser } from '@/lib/hooks/selected/use-selected-user';
import { UserRole } from '@/lib/types/values/user-role';
import { useForm } from '@inertiajs/react';

type FilterUserFormProps = BaseFormProps;

function FilterStructureForm({ onSuccess }: FilterUserFormProps) {
    const user = useSelectedUser();
    const { filter } = usePagniatedStructures();
    const action = user.actions.structures;

    const { get, data, setData, errors, processing, transform } = useForm({
        createdFrom: filter.createdFrom ? new Date(filter.createdFrom) : undefined,
        createdTo: filter.createdTo ? new Date(filter.createdTo) : undefined,
        role: filter.role,
    });

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

                <CompactFormField label="Role">
                    <FormInputUserRole
                        value={data.role ?? UserRole.Manager}
                        onChange={(value) => setData('role', value)}
                        message={errors.role}
                    />
                </CompactFormField>
            </CompactFormSection>
        </CompactForm>
    );
}

export default FilterStructureForm;
