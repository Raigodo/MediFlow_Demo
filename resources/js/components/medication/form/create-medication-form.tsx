import { BaseFormProps } from '@/components/_shared/form/base-form-props';
import FormInputNumber from '@/components/_shared/form/input/form-input-number';
import FormSelectMedicament from '@/components/_shared/form/input/select-medicament';
import {
    CompactForm,
    CompactFormField,
} from '@/components/_shared/modal/variant/write/compact-form';
import { useTempId } from '@/lib/hooks/use-temp-id';
import { MedicamentPreview } from '@/lib/types/models/medicament/medicament-preview';
import { MedicationTemp } from '@/lib/types/models/medication/medication-temp';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';

interface CreateMedicationFormProps extends BaseFormProps {
    onSubmit: (tempModel: MedicationTemp) => void;
}

function CreateMedicationForm({ onSuccess, onSubmit }: CreateMedicationFormProps) {
    const { generate } = useTempId();
    const { data, setData, errors, processing } = useForm<MedicationTemp>({
        id: generate(),
        medicamentTypeId: 0,
        amount: 0,
    });

    const [medicament, setMedicament] = useState<MedicamentPreview | undefined>(undefined);

    function handleSelectMedicament(medicament: MedicamentPreview | undefined) {
        setData('medicamentTypeId', medicament?.medicamentType.data.id ?? 0);
        setMedicament(medicament);
    }

    function handleSubmit() {
        onSubmit(data);
        onSuccess?.();
    }

    return (
        <CompactForm onSubmit={handleSubmit} processing={processing}>
            <CompactFormField label="Medikaments">
                <FormSelectMedicament
                    selectedId={medicament?.id}
                    onValueChange={handleSelectMedicament}
                    message={errors.medicamentTypeId}
                />
            </CompactFormField>

            <CompactFormField label="Daudzums">
                <FormInputNumber
                    disabled={medicament === undefined}
                    value={data.amount}
                    onChange={(value) => setData('amount', value)}
                    units={medicament?.medicamentType.data.form}
                    message={errors.amount}
                />
            </CompactFormField>
        </CompactForm>
    );
}

export default CreateMedicationForm;
