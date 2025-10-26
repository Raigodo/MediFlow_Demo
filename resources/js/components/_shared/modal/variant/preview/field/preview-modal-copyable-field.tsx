import CopyableLine from '@/components/_shared/copyable-line';
import { Label } from '@/components/_shared/ui/label';
import PreviewModalField from './preview-modal-field';

function PreviewModalCopyableField({ value, label }: { value: string; label: string }) {
    return (
        <PreviewModalField>
            <Label>{label}</Label>
            <CopyableLine value={value} />
        </PreviewModalField>
    );
}

export default PreviewModalCopyableField;
