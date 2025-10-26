import { BaseFormProps } from '@/components/_shared/form/base-form-props';
import FormInputMultiLine from '@/components/_shared/form/input/form-input-multi-line';
import {
    CompactForm,
    CompactFormField,
} from '@/components/_shared/modal/variant/write/compact-form';
import { useCurrentStructure } from '@/lib/hooks/current/use-current-structure';
import { EmployeeRole } from '@/lib/types/values/employee-role';
import { useForm } from '@inertiajs/react';
import FormInputEmployeeRole from '../../_shared/form/input/form-input-employee-role';

function CreateInvitationForm({ onSuccess }: BaseFormProps) {
    const structure = useCurrentStructure();

    const { post, data, setData, errors, processing, transform } = useForm({
        role: EmployeeRole.NONE,
        note: '',
    });

    if (!structure) throw Error('can not proceed (no structure)');

    const action = structure.actions.storeInvitation;

    transform((rest) => ({
        _method: action.method,
        ...rest,
    }));

    function submit() {
        post(action.url, { onSuccess });
    }

    return (
        <CompactForm onSubmit={submit} processing={processing}>
            <CompactFormField label="Ieņemamais amats">
                <FormInputEmployeeRole
                    value={data.role}
                    onChange={(value) => setData('role', value)}
                    message={errors.role}
                />
            </CompactFormField>
            <CompactFormField label="Piezīme">
                <FormInputMultiLine
                    value={data.note}
                    onChange={(value) => setData('note', value)}
                    classNames={{
                        textArea: 'h-[100px] max-h-[200px] min-h-[100px]',
                    }}
                    message={errors.note}
                />
            </CompactFormField>
        </CompactForm>
    );
}

export default CreateInvitationForm;
