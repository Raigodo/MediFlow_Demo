import { BaseFormProps } from '@/components/_shared/form/base-form-props';
import FormInputNumber from '@/components/_shared/form/input/form-input-number';
import FormSelectMedicament from '@/components/_shared/form/input/select-medicament';
import {
    CompactForm,
    CompactFormField,
} from '@/components/_shared/modal/variant/write/compact-form';
import { Button } from '@/components/_shared/ui/button';
import { MedicamentPreview } from '@/lib/types/models/medicament/medicament-preview';
import { MedicationTemp } from '@/lib/types/models/medication/medication-temp';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';

interface EditMedicationFormProps extends BaseFormProps {
    className?: string;
    medication: MedicationTemp;
    onSubmit: (tempModel: MedicationTemp) => void;
    onDelete: (tempModel: MedicationTemp) => void;
}

function EditMedicationForm({
    medication,
    className,
    onSuccess,
    onSubmit,
    onDelete,
}: EditMedicationFormProps) {
    const { data, setData, errors, processing } = useForm(medication);

    const [medicament, setMedicament] = useState<MedicamentPreview | undefined>(undefined);

    function handleSelectMedicament(medicament: MedicamentPreview | undefined) {
        setData('medicamentTypeId', medicament?.medicamentType.data.id ?? 0);
        setMedicament(medicament);
    }

    function handleSubmit() {
        if (errors.medicamentTypeId) {
            onSubmit(data as MedicationTemp);
            onSuccess?.();
        }
    }

    function handleDelete() {
        if (errors.medicamentTypeId) {
            onDelete(medication);
            onSuccess?.();
        }
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

export default EditMedicationForm;
