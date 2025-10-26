import { BaseFormProps } from '@/components/_shared/form/base-form-props';
import FormInputInvalidityGroup from '@/components/_shared/form/input/form-input-invalidity-group';
import FormInputInvalidityType from '@/components/_shared/form/input/form-input-invalidity-type';
import FormInputLine from '@/components/_shared/form/input/form-input-line';
import FormInputNumber from '@/components/_shared/form/input/form-input-number';
import {
    CompactForm,
    CompactFormField,
    CompactFormRow,
} from '@/components/_shared/modal/variant/write/compact-form';
import { Label } from '@/components/_shared/ui/label';
import { Separator } from '@/components/_shared/ui/separator';
import { useCurrentStructure } from '@/lib/hooks/current/use-current-structure';
import { InvalidityGroup } from '@/lib/types/values/invalidity-group';
import { InvalidityType } from '@/lib/types/values/invalidity-type';
import { useForm } from '@inertiajs/react';
import FormInputDate from '../../_shared/form/input/form-input-date';

function CreateClientForm({ onSuccess }: BaseFormProps) {
    const structure = useCurrentStructure();
    const { post, data, setData, errors, processing, transform } = useForm({
        id: '',
        name: '',
        surname: '',
        birthDate: undefined as string | undefined,
        personalCode: '',
        language: '',
        religion: '',
        weight: 0,
        height: 0,
        invalidityGroup: InvalidityGroup.NONE,
        invalidityType: InvalidityType.NONE,
        invalidityExpiresOn: undefined as string | undefined,
    });

    if (!structure) throw Error('can not preceed (no structure)');

    const action = structure.actions.storeClient;

    transform((data) => ({ _method: action.method, ...data }));

    function submit() {
        post(action.url, { onSuccess });
    }

    return (
        <CompactForm onSubmit={submit} processing={processing}>
            <CompactFormRow>
                <CompactFormField label="Vārds">
                    <FormInputLine
                        value={data.name}
                        onChange={(value) => setData('name', value)}
                        message={errors.name}
                    />
                </CompactFormField>

                <CompactFormField label="Uzvārds">
                    <FormInputLine
                        value={data.surname}
                        onChange={(value) => setData('surname', value)}
                        message={errors.surname}
                    />
                </CompactFormField>
            </CompactFormRow>

            <CompactFormField label="Klienta Id">
                <FormInputLine
                    value={data.id}
                    onChange={(value) => setData('id', value)}
                    message={errors.id}
                />
            </CompactFormField>

            <CompactFormField label="Personas Kods">
                <FormInputLine
                    value={data.personalCode}
                    onChange={(value) => setData('personalCode', value)}
                    message={errors.personalCode}
                />
            </CompactFormField>

            <CompactFormRow>
                <CompactFormField label="Valoda">
                    <FormInputLine
                        value={data.language}
                        onChange={(value) => setData('language', value)}
                        message={errors.language}
                    />
                </CompactFormField>

                <CompactFormField label="Dzimšanas datums">
                    <FormInputDate
                        value={data.birthDate}
                        onStringValueChange={(value) => setData('birthDate', value)}
                        message={errors.birthDate}
                    />
                </CompactFormField>
            </CompactFormRow>

            <CompactFormField label="Religija">
                <FormInputLine
                    value={data.religion}
                    onChange={(value) => setData('religion', value)}
                    message={errors.religion}
                />
            </CompactFormField>

            <CompactFormRow>
                <CompactFormField label="Svars">
                    <FormInputNumber
                        units="kg"
                        value={data.weight}
                        onChange={(value) => setData('weight', value)}
                        message={errors.weight}
                    />
                </CompactFormField>

                <CompactFormField label="Augums">
                    <FormInputNumber
                        units="cm"
                        value={data.height}
                        onChange={(value) => setData('height', value)}
                        message={errors.height}
                    />
                </CompactFormField>
            </CompactFormRow>

            <div className="mt-8 space-y-2">
                <Label>Invaliditāte</Label>
                <Separator />
            </div>

            <CompactFormRow>
                <CompactFormField label="Invaliditātes Grupa">
                    <FormInputInvalidityGroup
                        value={data.invalidityGroup}
                        onChange={(value) => setData('invalidityGroup', value)}
                        message={errors.invalidityGroup}
                    />
                </CompactFormField>

                <CompactFormField label="Invaliditātes Derīguma termiņš">
                    <FormInputDate
                        value={data.invalidityExpiresOn}
                        onStringValueChange={(value) => setData('invalidityExpiresOn', value)}
                        message={errors.invalidityExpiresOn}
                    />
                </CompactFormField>
            </CompactFormRow>

            <CompactFormField label="Invaliditātes Tips">
                <FormInputInvalidityType
                    value={data.invalidityType}
                    onChange={(value) => setData('invalidityType', value)}
                    message={errors.invalidityType}
                />
            </CompactFormField>
        </CompactForm>
    );
}

export default CreateClientForm;
