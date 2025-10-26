import { BaseFormProps } from '@/components/_shared/form/base-form-props';
import FormInputLine from '@/components/_shared/form/input/form-input-line';
import {
    CompactForm,
    CompactFormField,
} from '@/components/_shared/modal/variant/write/compact-form';
import { useTempId } from '@/lib/hooks/use-temp-id';
import { DiagnoseTemp } from '@/lib/types/models/diagnose/diagnose-temp';
import { useForm } from '@inertiajs/react';

interface CreateDiagnoseFormProps extends BaseFormProps {
    onSubmit: (tempModel: DiagnoseTemp) => void;
}

function CreateDiagnoseForm({ onSuccess, onSubmit }: CreateDiagnoseFormProps) {
    const { generate } = useTempId();
    const { data, setData, errors, processing } = useForm<DiagnoseTemp>({
        id: generate(),
        name: '',
    });

    function submit() {
        onSubmit(data);
        onSuccess?.();
    }

    return (
        <CompactForm onSubmit={submit} processing={processing}>
            <CompactFormField label="Diagnozes nosaukums">
                <FormInputLine
                    value={data.name}
                    onChange={(value) => setData('name', value)}
                    message={errors.name}
                />
            </CompactFormField>
        </CompactForm>
    );
}

export default CreateDiagnoseForm;
