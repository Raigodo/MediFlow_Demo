import ElementAddButton from '@/components/_shared/dossier/button/element-add-button';
import ElementRemoveButton from '@/components/_shared/dossier/button/element-remove-button';
import {
    DossierSectionContentShell,
    DossierSectionHeaderShell,
    DossierSectionShell,
} from '@/components/_shared/dossier/dossier-section';
import { DossierFieldShell } from '@/components/_shared/dossier/field/dossier-field-shell';
import {
    DossierForm,
    DossierFormContent,
    DossierFormField,
    DossierFormHeader,
} from '@/components/_shared/dossier/form/dossier-form';
import { BaseFormProps } from '@/components/_shared/form/base-form-props';
import FormInputDate from '@/components/_shared/form/input/form-input-date';
import FormInputInvalidityGroup from '@/components/_shared/form/input/form-input-invalidity-group';
import FormInputInvalidityType from '@/components/_shared/form/input/form-input-invalidity-type';
import FormInputLine from '@/components/_shared/form/input/form-input-line';
import FormInputNumber from '@/components/_shared/form/input/form-input-number';
import { Label } from '@/components/_shared/ui/label';
import { useTempId } from '@/lib/hooks/use-temp-id';
import { ClientContactTemp } from '@/lib/types/models/client/client-contact-temp';
import { ClientDetailResource } from '@/lib/types/models/client/client-resources';
import { InvalidityGroup } from '@/lib/types/values/invalidity-group';
import { InvalidityType } from '@/lib/types/values/invalidity-type';
import { useForm } from '@inertiajs/react';
import SetClientIconModalTrigger from '../modal/button/set-client-icon-modal-trigger';

interface EditClientFormProps extends BaseFormProps {
    className?: string;
    client: ClientDetailResource;
}

function EditClientForm({ onSuccess, className, client }: EditClientFormProps) {
    const { generate, isTempId } = useTempId();
    const action = client.actions.update;
    const { post, data, setData, errors, processing, transform } = useForm({
        _method: action.method,
        name: client.data.name,
        surname: client.data.surname,
        birthDate: client.data.birthDate,
        personalCode: client.data.personalCode,
        language: client.data.language,
        religion: client.data.religion,
        height: client.data.height,
        weight: client.data.weight,
        invalidityGroup: client.data.invalidity.group as InvalidityGroup,
        invalidityType: client.data.invalidity.type as InvalidityType,
        invalidityExpiresOn: client.data.invalidity.expiresOn ?? undefined,
        contacts: client.data.contacts as ClientContactTemp[],
    });

    transform(({ contacts, ...rest }) => {
        const items = contacts.map(({ id, ...rest }) => ({
            ...rest,
            id: isTempId(id) ? undefined : id,
        }));
        return { ...rest, contacts: items };
    });

    function handleSubmit() {
        post(action.url, { onSuccess });
    }

    function addContact() {
        const contacts: typeof data.contacts = [
            ...data.contacts,
            { id: generate(), title: '', phoneNumber: '' },
        ];
        setData('contacts', contacts);
    }

    function RemoveContactAt(contactIndex: number) {
        const contacts = data.contacts.filter((_, index) => index !== contactIndex);
        setData('contacts', contacts);
    }
    const handleContactChange = (index: number, field: string, value: string) => {
        const updatedContacts = data.contacts.map((contact, i) =>
            i === index ? { ...contact, [field]: value } : contact,
        );
        setData('contacts', updatedContacts);
    };

    return (
        <DossierForm
            onSubmit={handleSubmit}
            backAction={client.actions.show}
            processing={processing}
            className={className}
        >
            <DossierFormHeader
                subtitle={client.data.id}
                renderIcon={<SetClientIconModalTrigger client={client} />}
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
                <DossierFormField label="Tika pievienots">
                    <FormInputDate
                        className="w-44"
                        disabled
                        value={new Date(client.data.joinedOn)}
                    />
                </DossierFormField>
                <DossierFormField label="Dzimšanas datums">
                    <FormInputDate
                        className="w-44"
                        value={data.birthDate}
                        onStringValueChange={(value) => value && setData('birthDate', value)}
                        message={errors.birthDate}
                    />
                </DossierFormField>
                <DossierFormField label="Parsonas kods">
                    <FormInputLine
                        className="w-44"
                        value={data.personalCode}
                        onChange={(value) => setData('personalCode', value)}
                        message={errors.birthDate}
                    />
                </DossierFormField>
                <DossierFormField label="Valoda">
                    <FormInputLine
                        className="w-44"
                        value={data.language}
                        onChange={(value) => setData('language', value)}
                        message={errors.language}
                    />
                </DossierFormField>
                <DossierFormField label="Religija">
                    <FormInputLine
                        className="w-44"
                        value={data.religion}
                        onChange={(value) => setData('religion', value)}
                        message={errors.religion}
                    />
                </DossierFormField>
                <DossierFormField label="Augums">
                    <FormInputNumber
                        className="w-44"
                        units={'cm'}
                        value={data.height}
                        onChange={(value) => setData('height', value)}
                        message={errors.height}
                    />
                </DossierFormField>
                <DossierFormField label="Svars">
                    <FormInputNumber
                        className="w-44"
                        units={'kg'}
                        value={data.weight}
                        onChange={(value) => setData('weight', value)}
                        message={errors.weight}
                    />
                </DossierFormField>
                <DossierFormField label="Invaliditātes grupa">
                    <FormInputInvalidityGroup
                        className="w-44"
                        value={data.invalidityGroup}
                        onChange={(value) => setData('invalidityGroup', value)}
                        message={errors.invalidityGroup}
                    />
                </DossierFormField>
                <DossierFormField label="Pastāvīga invaliditāte">
                    <FormInputInvalidityType
                        className="w-44"
                        value={data.invalidityType}
                        onChange={(value) => setData('invalidityType', value)}
                        message={errors.invalidityType}
                    />
                </DossierFormField>
                <DossierFormField label="Invaliditātes derīguma termiņš">
                    <FormInputDate
                        className="w-44"
                        value={data.invalidityExpiresOn}
                        onStringValueChange={(value) => setData('invalidityExpiresOn', value)}
                        message={errors.invalidityExpiresOn}
                    />
                </DossierFormField>
            </DossierFormContent>

            <DossierSectionShell>
                <DossierSectionHeaderShell>
                    <div className="flex justify-between">
                        <Label className="text-lg">Kontakti</Label>
                        <ElementAddButton onClick={addContact} hint={'Pievienot kontaktu'} />
                    </div>
                </DossierSectionHeaderShell>

                <DossierSectionContentShell>
                    {data.contacts.length <= 0 && (
                        <div className="text-foreground/50 text-sm">No Contacts</div>
                    )}
                    {data.contacts.map((contact, index) => (
                        <div
                            key={contact.id}
                            className="grid grid-cols-[28px_1fr] grid-rows-[auto_1fr]"
                        >
                            <ElementRemoveButton
                                hint={'Noņemt kontaktu'}
                                onClick={() => RemoveContactAt(index)}
                                className="size-4 self-center"
                            />
                            <FormInputLine
                                className="w-44"
                                inputSize={'md'}
                                placeholder="kontakta nosaukums"
                                value={contact.title}
                                onChange={(value) => handleContactChange(index, 'title', value)}
                                message={errors[
                                    `contacts.${index}.title` as keyof typeof errors
                                ]?.replace(`contacts.${index}.`, '')}
                            />

                            <div className="col-start-2 row-start-2">
                                <DossierFieldShell>
                                    <Label>Telefona numurs</Label>
                                    <FormInputLine
                                        className="w-44"
                                        placeholder="tālruņa numurs"
                                        value={contact.phoneNumber}
                                        onChange={(value) => {
                                            const contacts = data.contacts;
                                            contacts[index].phoneNumber = value;
                                            setData(`contacts`, contacts);
                                        }}
                                        message={errors[
                                            `contacts.${index}.phoneNumber` as keyof typeof errors
                                        ]?.replace(`contacts.${index}.`, '')}
                                    />
                                </DossierFieldShell>
                            </div>
                        </div>
                    ))}
                </DossierSectionContentShell>
            </DossierSectionShell>
        </DossierForm>
    );
}

export default EditClientForm;
