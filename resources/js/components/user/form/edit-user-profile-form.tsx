import {
    DossierForm,
    DossierFormContent,
    DossierFormField,
    DossierFormHeader,
} from '@/components/_shared/dossier/form/dossier-form';
import { BaseFormProps } from '@/components/_shared/form/base-form-props';
import FormInputLine from '@/components/_shared/form/input/form-input-line';
import { useLocalDate } from '@/lib/hooks/locale/useLocalDate';
import { useLocalEnum } from '@/lib/hooks/locale/useLocalEnum';
import { UserDetailResource } from '@/lib/types/models/user/user-resources';
import { useForm } from '@inertiajs/react';
import SetProfileIconModalTrigger from '../modal/button/set-profile-icon-modal-trigger';

interface EditUserProfileFormProps extends BaseFormProps {
    className?: string;
    user: UserDetailResource;
}

function EditProfileForm({ onSuccess, className, user }: EditUserProfileFormProps) {
    const { defaultDate } = useLocalDate();
    const { userRole } = useLocalEnum();

    const action = user.actions.update;
    const { post, data, setData, errors, processing } = useForm({
        _method: action.method,
        name: user.data.name,
        surname: user.data.surname,
    });

    function handleSubmit() {
        post(action.url, { onSuccess });
    }

    return (
        <DossierForm
            onSubmit={handleSubmit}
            backAction={user.actions.show}
            processing={processing}
            className={className}
        >
            <DossierFormHeader
                subtitle={user.data.id}
                renderIcon={<SetProfileIconModalTrigger user={user} />}
            >
                <FormInputLine
                    placeholder="vārds"
                    inputSize={'xl'}
                    value={data.name}
                    onChange={(value) => setData('name', value)}
                    message={errors.name}
                />
                <FormInputLine
                    placeholder="uzvārds"
                    inputSize={'xl'}
                    value={data.surname}
                    onChange={(value) => setData('surname', value)}
                    message={errors.surname}
                />
            </DossierFormHeader>

            <DossierFormContent>
                <DossierFormField label="Lietotāja loma">
                    {userRole(user.data.role)}
                </DossierFormField>
                <DossierFormField label="Pievienojās">
                    {defaultDate(user.data.createdAt)}
                </DossierFormField>
                <DossierFormField label="Epasta Verifikācijas datums">
                    {defaultDate(user.data.verifiedAt)}
                </DossierFormField>
            </DossierFormContent>
        </DossierForm>
    );
}

export default EditProfileForm;
