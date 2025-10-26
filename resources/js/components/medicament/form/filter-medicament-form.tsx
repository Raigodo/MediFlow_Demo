import { BaseFormProps } from '@/components/_shared/form/base-form-props';
import { CompactForm } from '@/components/_shared/modal/variant/write/compact-form';
import { useCurrentStructure } from '@/lib/hooks/current/use-current-structure';
import { usePagniatedMedicaments } from '@/lib/hooks/paginated/use-paginated-medicaments';
import { useForm } from '@inertiajs/react';

type FilterMedicamentFormProps = BaseFormProps;

function FilterMedicamentForm({ onSuccess }: FilterMedicamentFormProps) {
    const structure = useCurrentStructure();
    const { filter } = usePagniatedMedicaments();

    const { get, processing } = useForm(filter);

    if (!structure) throw Error('can not preceed (no structure)');

    const action = structure.actions.medicaments;

    function submit() {
        get(action.url, { onSuccess });
    }

    return (
        <CompactForm onSubmit={submit} processing={processing} className="h-full px-4 pb-4">
            <></>
        </CompactForm>
    );
}

export default FilterMedicamentForm;
