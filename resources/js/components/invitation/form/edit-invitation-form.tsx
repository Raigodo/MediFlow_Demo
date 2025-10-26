import CopyableLine from '@/components/_shared/copyable-line';
import { DossierHeader } from '@/components/_shared/dossier/dossier-main';
import DossierStructureFieldLink from '@/components/_shared/dossier/field/dossier-structure-field-link';
import {
    DossierForm,
    DossierFormContent,
    DossierFormField,
    DossierFormSection,
} from '@/components/_shared/dossier/form/dossier-form';
import { BaseFormProps } from '@/components/_shared/form/base-form-props';
import FormInputMultiLine from '@/components/_shared/form/input/form-input-multi-line';
import UserName from '@/components/_shared/user-name';
import { useCurrentUser } from '@/lib/hooks/current/use-current-user';
import { useLocalDate } from '@/lib/hooks/locale/useLocalDate';
import { useLocalEnum } from '@/lib/hooks/locale/useLocalEnum';
import { InvitationDetailResource } from '@/lib/types/models/invitation/invitation-resources';
import { useForm } from '@inertiajs/react';

interface EditDeviceFormProps extends BaseFormProps {
    className?: string;
    invitation: InvitationDetailResource;
}

function EditInvitationForm({ invitation, className, onSuccess }: EditDeviceFormProps) {
    const user = useCurrentUser();
    const action = invitation.actions.update;
    const { defaultDate } = useLocalDate();
    const { employeeRole } = useLocalEnum();

    const { post, data, setData, errors, processing } = useForm({
        _method: action.method,
        note: invitation.data.note,
    });

    if (!user) throw Error('can not proceed (No current User)');

    function handleSubmit() {
        post(action.url, { onSuccess });
    }

    return (
        <DossierForm
            onSubmit={handleSubmit}
            backAction={invitation.actions.show}
            processing={processing}
            className={className}
        >
            <DossierHeader
                title={'Darbinieka ielūgums'}
                subtitle={invitation.data.id}
                iconUrl={invitation.data.structure.data.iconUrl}
                hideAvatar
            />
            <DossierFormContent>
                <DossierStructureFieldLink
                    label="Structure"
                    structure={invitation.data.structure}
                />

                <DossierFormField label="Ieņemamais amats">
                    {employeeRole(invitation.data.role)}
                </DossierFormField>

                <DossierFormField label="Izveidots">
                    {defaultDate(invitation.data.createdAt)}
                </DossierFormField>

                <DossierFormField label="Ielūguma Kods">
                    <CopyableLine value={invitation.data.tokenValue} />
                </DossierFormField>

                <DossierFormField label="Statuss">
                    {invitation.data.createdEmployee ? 'Izlietots' : 'Aktīvs'}
                </DossierFormField>

                {invitation.data.createdEmployee && (
                    <DossierFormField
                        label="Izlietoja"
                        href={invitation.data.createdEmployee.actions.show.url}
                    >
                        <UserName user={invitation.data.createdEmployee.data.user?.data} />
                    </DossierFormField>
                )}

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

export default EditInvitationForm;
