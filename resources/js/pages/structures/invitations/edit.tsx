import EditInvitationForm from '@/components/invitation/form/edit-invitation-form';
import AppLayout from '@/layouts/app-layout';
import CentredLayout from '@/layouts/centred-layout';
import DossierPagelayout from '@/layouts/dossier-page-layout';
import { useCurrentStructure } from '@/lib/hooks/current/use-current-structure';
import { useCurrentUser } from '@/lib/hooks/current/use-current-user';
import { useSelectedInvitation } from '@/lib/hooks/selected/use-selected-invitation';

function ShowInvitationPage() {
    const invitation = useSelectedInvitation();
    const user = useCurrentUser();
    const structure = useCurrentStructure();

    if (!user || !structure) throw Error('can not proceed (no user | structure)');

    return (
        <AppLayout
        // backStack={[
        //     { label: 'Struktūrvienības', href: routeTo.structure.index({ user }).path },
        //     { label: 'Skatīt', href: routeTo.structure.show({ structure }).path },
        //     { label: 'Ielūgumi', href: routeTo.invitation.show({ invitation }).path },
        //     { label: 'Rediģēt' },
        // ]}
        >
            <CentredLayout>
                <DossierPagelayout>
                    <EditInvitationForm invitation={invitation} />
                </DossierPagelayout>
            </CentredLayout>
        </AppLayout>
    );
}

export default ShowInvitationPage;
