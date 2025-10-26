import { DossierForm, DossierFormHeader } from '@/components/_shared/dossier/form/dossier-form';
import { BaseFormProps } from '@/components/_shared/form/base-form-props';
import FormInputLine from '@/components/_shared/form/input/form-input-line';
import SetStructureIconModalTrigger from '@/components/structure/modal/button/set-structure-icon-modal-trigger';
import { StructureDetailResource } from '@/lib/types/models/structure/structure-resources';
import { useForm } from '@inertiajs/react';

interface EditStructureFormProps extends BaseFormProps {
    className?: string;
    structure: StructureDetailResource;
}

function EditStructureForm({ onSuccess, className, structure }: EditStructureFormProps) {
    const action = structure.actions.update;
    const { post, data, setData, errors, processing } = useForm({
        _method: action.method,
        name: structure.data.name,
        value: '',
    });

    function handleSubmit() {
        post(action.url, { onSuccess });
    }

    return (
        <DossierForm
            onSubmit={handleSubmit}
            backAction={structure.actions.show}
            processing={processing}
            className={className}
        >
            <DossierFormHeader
                subtitle={structure.data.id}
                renderIcon={<SetStructureIconModalTrigger structure={structure} />}
            >
                <FormInputLine
                    placeholder="Struktūrvienības nosaukums"
                    inputSize={'xl'}
                    value={data.name}
                    onChange={(value) => setData('name', value)}
                    message={errors.name}
                />
            </DossierFormHeader>
        </DossierForm>
    );
}

export default EditStructureForm;
