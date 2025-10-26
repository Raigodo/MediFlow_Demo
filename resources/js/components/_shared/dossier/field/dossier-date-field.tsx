import { useLocalDate } from '@/lib/hooks/locale/useLocalDate';
import { Label } from '../../ui/label';
import { DossierFieldShell } from './dossier-field-shell';

function DossierDateField({ value, label }: { value: string | undefined | null; label: string }) {
    const { defaultDate } = useLocalDate();

    return (
        <DossierFieldShell>
            <Label>{label}</Label>
            {defaultDate(value)}
        </DossierFieldShell>
    );
}

export default DossierDateField;
