import { DossierLayout } from '@/components/_shared/dossier/dossier-layout';
import { DossierContentShell } from '@/components/_shared/dossier/dossier-main';
import {
    DossierSectionContentShell,
    DossierSectionHeaderShell,
    DossierSectionShell,
} from '@/components/_shared/dossier/dossier-section';
import DossierDateField from '@/components/_shared/dossier/field/dossier-date-field';
import DossierPlainField from '@/components/_shared/dossier/field/dossier-plain-field';
import { Label } from '@/components/_shared/ui/label';
import { ResourceSectionContextProvider } from '@/contexts/resource-sction-context';
import { useLocalEnum } from '@/lib/hooks/locale/useLocalEnum';
import { ClientDetailResource } from '@/lib/types/models/client/client-resources';
import { Fragment } from 'react/jsx-runtime';
import ClientDossierHeader from './shared/client-dossier-header';

function ClientDossier({ client }: { client: ClientDetailResource }) {
    const { invalidityGroup, invalidityType } = useLocalEnum();

    return (
        <ResourceSectionContextProvider defaultSectionKey={'baseData'}>
            <DossierLayout actions={{ title: 'Client', dropdown: client.actions.dropdown }}>
                <ClientDossierHeader client={client} />

                <DossierContentShell>
                    <DossierDateField label="Tika pievienots" value={client.data.joinedOn} />
                    <DossierDateField label="Dzimšanas datums" value={client.data.birthDate} />
                    <DossierPlainField label="Personas kods" value={client.data.personalCode} />
                    <DossierPlainField label="Valoda" value={client.data.language} />
                    <DossierPlainField label="Religija" value={client.data.religion} />
                    <DossierPlainField label="Augums" value={`${client.data.height} cm`} />
                    <DossierPlainField label="Svars" value={`${client.data.weight} kg`} />
                    <DossierPlainField
                        label="Invaliditātes grupa"
                        value={invalidityGroup(client.data.invalidity.group)}
                    />
                    <DossierPlainField
                        label="Invaliditātes tips"
                        value={invalidityType(client.data.invalidity.type)}
                    />
                    {client.data.archivedOn && (
                        <DossierDateField label="Arhivēts" value={client.data.archivedOn} />
                    )}
                    <DossierDateField
                        label="Invaliditātes derīguma termiņš"
                        value={client.data.invalidity.expiresOn}
                    />
                </DossierContentShell>

                <DossierSectionShell>
                    <DossierSectionHeaderShell>
                        <Label className="text-lg">Kontakti</Label>
                    </DossierSectionHeaderShell>

                    <DossierSectionContentShell>
                        {client.data.contacts.map((contact) => (
                            <Fragment key={contact.id}>
                                <Label className="text-md ml-1.5">{contact.title}</Label>
                                <DossierPlainField
                                    label="Telefona numurs:"
                                    value={contact.phoneNumber}
                                />
                            </Fragment>
                        ))}
                        {client.data.contacts.length <= 0 && (
                            <div className="text-foreground/50 text-sm">No Contacts</div>
                        )}
                    </DossierSectionContentShell>
                </DossierSectionShell>
            </DossierLayout>
        </ResourceSectionContextProvider>
    );
}

export default ClientDossier;
