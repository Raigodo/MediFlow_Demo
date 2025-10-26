import { Label } from '../../ui/label';
import { DossierFieldShell } from './dossier-field-shell';

function DossierPlainField({
    value,
    label,
    postfix,
}: {
    value: string | number | undefined;
    label: string;
    postfix?: string;
}) {
    return (
        <DossierFieldShell>
            <Label>{label}</Label>
            <p>
                {value} <span className="text-foreground/50 text-sm">{postfix}</span>
            </p>
        </DossierFieldShell>
    );
}

export default DossierPlainField;
