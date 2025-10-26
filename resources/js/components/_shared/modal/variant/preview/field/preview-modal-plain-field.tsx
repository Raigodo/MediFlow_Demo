import { Label } from '@/components/_shared/ui/label';
import PreviewModalField from './preview-modal-field';

function PreviewModalPlainField({
    value,
    label,
    postfix,
}: {
    value: string | number | undefined;
    label: string;
    postfix?: string;
}) {
    return (
        <PreviewModalField>
            <Label>{label}</Label>
            <p>
                {value} <span className="text-foreground/50">{postfix}</span>
            </p>
        </PreviewModalField>
    );
}

export default PreviewModalPlainField;
