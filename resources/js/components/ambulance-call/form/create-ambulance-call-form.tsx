import { BaseFormProps } from '@/components/_shared/form/base-form-props';
import FormInputLine from '@/components/_shared/form/input/form-input-line';
import {
    CompactForm,
    CompactFormField,
} from '@/components/_shared/modal/variant/write/compact-form';
import { useTempId } from '@/lib/hooks/use-temp-id';
import { AmbulanceCallTemp } from '@/lib/types/models/ambulance-call/ambulance-call-temp';
import { useForm } from '@inertiajs/react';

interface CreateAmbulanceCallForm extends BaseFormProps {
    onSubmit: (tempModel: AmbulanceCallTemp) => void;
}

function CreateAmbulanceCallForm({ onSuccess, onSubmit }: CreateAmbulanceCallForm) {
    const { generate } = useTempId();
    const { data, setData, errors, processing } = useForm<AmbulanceCallTemp>({
        id: generate(),
        result: '',
    });

    function submit() {
        onSubmit(data);
        onSuccess?.();
    }

    return (
        <CompactForm onSubmit={submit} processing={processing}>
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

export default CreateAmbulanceCallForm;
