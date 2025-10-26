import { DossierHeader } from '@/components/_shared/dossier/dossier-main';
import {
    DossierForm,
    DossierFormContent,
    DossierFormField,
    DossierFormSection,
} from '@/components/_shared/dossier/form/dossier-form';
import { BaseFormProps } from '@/components/_shared/form/base-form-props';
import FormInputMultiLine from '@/components/_shared/form/input/form-input-multi-line';
import UserName from '@/components/_shared/user-name';
import { useCurrentStructure } from '@/lib/hooks/current/use-current-structure';
import { useLocalDate } from '@/lib/hooks/locale/useLocalDate';
import { TrustedDeviceDetailResource } from '@/lib/types/models/trusted-device/trusted-device-resources';
import { useForm } from '@inertiajs/react';

interface EditDeviceFormProps extends BaseFormProps {
    className?: string;
    device: TrustedDeviceDetailResource;
}

function EditDeviceForm({ device, onSuccess, className }: EditDeviceFormProps) {
    const { defaultDate } = useLocalDate();
    const structure = useCurrentStructure();
    const action = device.actions.update;
    const { post, data, setData, errors, processing } = useForm({
        _method: action.method,
        note: device.data.note,
    });

    if (!structure) throw Error('can not preceed (No current Structure)');

    function handleSubmit() {
        post(action.url, { onSuccess });
    }

    return (
        <DossierForm
            onSubmit={handleSubmit}
            backAction={structure.actions.devices}
            processing={processing}
            className={className}
        >
            <DossierHeader title={'Uzticamā ierīce'} subtitle={device.data.id} hideAvatar />

            <DossierFormContent>
                <DossierFormField label="Izveidots">
                    {defaultDate(device.data.createdAt)}
                </DossierFormField>

                <DossierFormField label="Pēdējā piekļuve">
                    {defaultDate(device.data.lastUsedAt)}
                </DossierFormField>

                <DossierFormField label="Pēdējais piekļuva">
                    {!device.data.lastEmployee ? (
                        'nav'
                    ) : (
                        <UserName user={device.data.lastEmployee.data.user?.data} />
                    )}
                </DossierFormField>

                <DossierFormSection label="Piezīme">
                    <FormInputMultiLine
                        rows={5}
                        value={data.note}
                        onChange={(value) => setData('note', value)}
                        message={errors.note}
                    />
                </DossierFormSection>
            </DossierFormContent>
        </DossierForm>
    );
}

export default EditDeviceForm;
