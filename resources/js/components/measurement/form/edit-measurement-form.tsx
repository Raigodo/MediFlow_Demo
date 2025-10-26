import { BaseFormProps } from '@/components/_shared/form/base-form-props';
import FormInputNumber from '@/components/_shared/form/input/form-input-number';
import FormSelectMeasurementType from '@/components/_shared/form/input/select-measurement-type';
import {
    CompactForm,
    CompactFormField,
} from '@/components/_shared/modal/variant/write/compact-form';
import { Button } from '@/components/_shared/ui/button';
import { MeasurementTemp } from '@/lib/types/models/measurement/measurement-temp';
import { useForm } from '@inertiajs/react';

interface EditMeasurementFormProps extends BaseFormProps {
    className?: string;
    measurement: MeasurementTemp;
    onSubmit: (tempModel: MeasurementTemp) => void;
    onDelete: (tempModel: MeasurementTemp) => void;
}

function EditMeasurementForm({
    measurement,
    className,
    onSuccess,
    onSubmit,
    onDelete,
}: EditMeasurementFormProps) {
    const { data, setData, errors, processing } = useForm(measurement);

    function handleSubmit() {
        onSubmit(data);
        onSuccess?.();
    }

    function handleDelete() {
        onDelete(measurement);
        onSuccess?.();
    }

    return (
        <CompactForm
            onSubmit={handleSubmit}
            processing={processing}
            className={className}
            renderCancelButton={
                <Button
                    type="button"
                    variant="destructive"
                    size={'default'}
                    onSubmit={handleDelete}
                >
                    Delete
                </Button>
            }
        >
            <CompactFormField label="Mērījuma tips">
                <FormSelectMeasurementType
                    selectedId={data.measurementTypeId}
                    onValueChange={(value) => setData('measurementTypeId', value?.id ?? 0)}
                    message={errors.measurementTypeId}
                />
            </CompactFormField>

            <CompactFormField label="Mērījuma rezultāts">
                <FormInputNumber
                    value={data.value}
                    onChange={(value) => setData('value', value)}
                    message={errors.value}
                />
            </CompactFormField>
        </CompactForm>
    );
}

export default EditMeasurementForm;
