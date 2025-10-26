import { BaseFormProps } from '@/components/_shared/form/base-form-props';
import FormInputLine from '@/components/_shared/form/input/form-input-line';
import {
    CompactForm,
    CompactFormField,
} from '@/components/_shared/modal/variant/write/compact-form';
import { Button } from '@/components/_shared/ui/button';
import { AmbulanceCallTemp } from '@/lib/types/models/ambulance-call/ambulance-call-temp';
import { useForm } from '@inertiajs/react';

interface EditAmbulanceCallFormProps extends BaseFormProps {
    ambulanceCall: AmbulanceCallTemp;
    onSubmit: (tempModel: AmbulanceCallTemp) => void;
    onDelete: (tempModel: AmbulanceCallTemp) => void;
}

function EditAmbulanceCallForm({
    ambulanceCall,
    onSuccess,
    onSubmit,
    onDelete,
}: EditAmbulanceCallFormProps) {
    const { data, setData, errors, processing } = useForm(ambulanceCall);

    function handleSubmit() {
        onSubmit(data);
        onSuccess?.();
    }

    function handleDelete() {
        onDelete(ambulanceCall);
        onSuccess?.();
    }

    return (
        <CompactForm
            onSubmit={handleSubmit}
            processing={processing}
            renderCancelButton={
                <Button type="button" variant="destructive" size={'default'} onClick={handleDelete}>
                    Delete
                </Button>
            }
        >
            <CompactFormField label="iznākums">
                <FormInputLine
                    value={data.result}
                    onChange={(value) => setData('result', value)}
                    message={errors.result}
                />
            </CompactFormField>
        </CompactForm>
    );
}

export default EditAmbulanceCallForm;
