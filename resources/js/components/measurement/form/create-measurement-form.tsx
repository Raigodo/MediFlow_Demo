import { BaseFormProps } from '@/components/_shared/form/base-form-props';
import FormInputNumber from '@/components/_shared/form/input/form-input-number';
import FormSelectMeasurementType from '@/components/_shared/form/input/select-measurement-type';
import {
    CompactForm,
    CompactFormField,
} from '@/components/_shared/modal/variant/write/compact-form';
import { useTempId } from '@/lib/hooks/use-temp-id';
import { MeasurementTemp } from '@/lib/types/models/measurement/measurement-temp';
import { useForm } from '@inertiajs/react';

interface CreateMeasurementFormProps extends BaseFormProps {
    onSubmit: (tempModel: MeasurementTemp) => void;
}

function CreateMeasurementForm({ onSuccess, onSubmit }: CreateMeasurementFormProps) {
    const { generate } = useTempId();
    const { data, setData, errors, processing } = useForm<MeasurementTemp>({
        id: generate(),
        measurementTypeId: 0,
        value: 0,
    });

    function submit() {
        onSubmit(data);
        onSuccess?.();
    }

    return (
        <CompactForm onSubmit={submit} processing={processing}>
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

export default CreateMeasurementForm;
