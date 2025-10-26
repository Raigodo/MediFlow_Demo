import CopyableLine from '../../copyable-line';
import { Label } from '../../ui/label';
import { DossierFieldShell } from './dossier-field-shell';

function DossierCopyableField({ value, label }: { value: string; label: string }) {
    return (
        <DossierFieldShell>
            <Label>{label}</Label>
            <CopyableLine value={value} />
        </DossierFieldShell>
    );
}

export default DossierCopyableField;
