import ElementAddButton from '@/components/_shared/dossier/button/element-add-button';
import ElementRemoveButton from '@/components/_shared/dossier/button/element-remove-button';
import { DossierContentShell, DossierHeaderShell } from '@/components/_shared/dossier/dossier-main';
import { DossierFieldShell } from '@/components/_shared/dossier/field/dossier-field-shell';
import { DossierForm } from '@/components/_shared/dossier/form/dossier-form';
import { BaseFormProps } from '@/components/_shared/form/base-form-props';
import FormInputNumber from '@/components/_shared/form/input/form-input-number';
import FormSelectMedicamentType from '@/components/_shared/form/input/select-medicament-type';
import { Label } from '@/components/_shared/ui/label';
import { useCurrentStructure } from '@/lib/hooks/current/use-current-structure';
import { MedicamentTypePreview } from '@/lib/types/models/medicament/medicament-type-preview';
import { useForm } from '@inertiajs/react';
import { nanoid } from 'nanoid';

type BatchSupplyMedicamentFormProps = BaseFormProps;

function BatchSupplyMedicamentForm({ onSuccess }: BatchSupplyMedicamentFormProps) {
    const structure = useCurrentStructure();
    const { post, data, setData, errors, processing, transform } = useForm({
        medicaments: [
            {
                medicamentType: undefined as MedicamentTypePreview | undefined,
                amount: 0,
                temporalId: nanoid() as string,
            },
        ],
    });

    if (!structure) throw Error('can not preceed (no structure)');

    const action = structure.actions.storeMedicaments;

    transform((data) => ({ _method: action.method, ...data }));

    transform(({ medicaments, ...rest }) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const items = medicaments.map(({ temporalId, medicamentType, ...rest }) => ({
            medicamentTypeId: medicamentType?.id,
            ...rest,
        }));
        return { ...rest, medicaments: items };
    });

    function handleSubmit() {
        post(action.url, { onSuccess });
    }

    function handleAddMedicament() {
        const medicaments = [
            ...data.medicaments,
            {
                medicamentType: undefined,
                amount: 0,
                temporalId: nanoid(),
            },
        ];
        setData('medicaments', medicaments);
    }

    const handleMedicamentChange = (
        index: number,
        field: string,
        fieldValue: MedicamentTypePreview | undefined | number,
    ) => {
        const updatedMedicaments = data.medicaments.map((item, i) =>
            i === index ? { ...item, [field]: fieldValue } : item,
        );
        setData('medicaments', updatedMedicaments);
    };

    function handleRemoveMedicamentAt(medicamentIndex: number) {
        const contacts = data.medicaments.filter((_, index) => index !== medicamentIndex);
        setData('medicaments', contacts);
    }

    return (
        <DossierForm
            onSubmit={handleSubmit}
            backAction={structure.actions.medicaments}
            processing={processing}
        >
            <DossierHeaderShell className="flex justify-between">
                <div className="space-y-1">
                    <Label className="col-start-1 row-start-1 text-xl">
                        Pieveduma medikamentu saraksts
                    </Label>
                    <Label className="col-start-1 row-start-2 text-base font-normal">
                        saraksts ar medikamentiem, kas tiks pievienoti sistēmas uzskaitē
                    </Label>
                </div>
                <ElementAddButton onClick={handleAddMedicament} hint={'Pievienot Medikamentu'} />
            </DossierHeaderShell>

            <DossierContentShell className={'min-h-[300px'}>
                {data.medicaments.map((medicament, index) => (
                    <DossierFieldShell key={medicament.temporalId} className="grow">
                        <div className="flex items-center gap-x-2">
                            <ElementRemoveButton
                                onClick={() => handleRemoveMedicamentAt(index)}
                                hint={'noņemt medikamentu'}
                                className="size-4"
                            />
                            <FormSelectMedicamentType
                                exclude={data.medicaments.map(
                                    (item) => item.medicamentType ?? { id: undefined },
                                )}
                                selectedId={medicament.medicamentType?.id}
                                onValueChange={(value) =>
                                    handleMedicamentChange(index, 'medicamentType', value)
                                }
                                className="w-64"
                                message={errors[
                                    `medicaments.${index}.medicamentTypeId` as keyof typeof errors
                                ]?.replace(`medicaments.${index}.`, '')}
                            />
                        </div>
                        <div>
                            <FormInputNumber
                                disabled={medicament.medicamentType === undefined}
                                value={medicament.amount}
                                onChange={(value) => handleMedicamentChange(index, 'amount', value)}
                                units={medicament.medicamentType?.form}
                                message={errors[
                                    `medicaments.${index}.amount` as keyof typeof errors
                                ]?.replace(`medicaments.${index}.`, '')}
                            />
                        </div>
                    </DossierFieldShell>
                ))}
            </DossierContentShell>
        </DossierForm>
    );
}

export default BatchSupplyMedicamentForm;
