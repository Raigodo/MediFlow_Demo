import { BaseFormProps } from '@/components/_shared/form/base-form-props';
import FormInputLine from '@/components/_shared/form/input/form-input-line';
import {
    CompactForm,
    CompactFormField,
} from '@/components/_shared/modal/variant/write/compact-form';
import { Button } from '@/components/_shared/ui/button';
import { DiagnoseTemp } from '@/lib/types/models/diagnose/diagnose-temp';
import { useForm } from '@inertiajs/react';

interface EditDiagnoseFormProps extends BaseFormProps {
    className?: string;
    diagnose: DiagnoseTemp;
    onSubmit: (tempModel: DiagnoseTemp) => void;
    onDelete: (tempModel: DiagnoseTemp) => void;
}

function EditDiagnoseForm({
    diagnose,
    className,
    onSuccess,
    onSubmit,
    onDelete,
}: EditDiagnoseFormProps) {
    const { data, setData, errors, processing } = useForm<DiagnoseTemp>(diagnose);

    function handleSubmit() {
        onSubmit(data);
        onSuccess?.();
    }

    function handleDelete() {
        onDelete(diagnose);
        onSuccess?.();
    }

    return (
        <CompactForm
            onSubmit={handleSubmit}
            processing={processing}
            className={className}
            renderCancelButton={
                <Button type="button" variant="destructive" size={'default'} onClick={handleDelete}>
                    Delete
                </Button>
            }
        >
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

export default EditDiagnoseForm;
