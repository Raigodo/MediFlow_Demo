import { Label } from '@/components/_shared/ui/label';
import { useLocalDate } from '@/lib/hooks/locale/useLocalDate';
import PreviewModalField from './preview-modal-field';

function PreviewModalDateField({
    value,
    label,
}: {
    value: string | undefined | null;
    label: string;
}) {
    const { defaultDate } = useLocalDate();

    return (
        <PreviewModalField>
            <Label>{label}</Label>
            {defaultDate(value)}
        </PreviewModalField>
    );
}

export default PreviewModalDateField;
