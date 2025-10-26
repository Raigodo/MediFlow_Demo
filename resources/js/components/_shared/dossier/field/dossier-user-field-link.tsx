import { UserPreviewResource } from '@/lib/types/models/user/user-resources';
import { Link } from '@inertiajs/react';
import { Label } from '../../ui/label';
import UserName from '../../user-name';
import { DossierFieldShell } from './dossier-field-shell';

function DossierUserFieldLink({ user, label }: { user: UserPreviewResource; label: string }) {
    return (
        <Link href={user.actions.show.url}>
            <DossierFieldShell className="hover:bg-muted">
                <Label>{label}</Label>
                <UserName user={user.data} />
            </DossierFieldShell>
        </Link>
    );
}

export default DossierUserFieldLink;
