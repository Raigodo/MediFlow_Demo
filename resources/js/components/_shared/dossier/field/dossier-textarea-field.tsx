import { cn } from '@/lib/utils';
import { Label } from '../../ui/label';
import { ScrollArea } from '../../ui/scroll-area';
import { textareaVariants } from '../../ui/textarea';

function DossierTextareaField({ value, label }: { value: string; label: string }) {
    return (
        <div className="mt-4 flex flex-col gap-2.5 px-2">
            <Label className="px-2">{label}</Label>
            <div
                className={cn(
                    textareaVariants(),
                    'h-fit max-h-92 min-h-32 resize-none rounded-md border px-0 text-lg shadow-lg focus-visible:ring-0',
                )}
            >
                <ScrollArea className="py-1 pr-10 pl-4">{value}</ScrollArea>
            </div>
        </div>
    );
}

export default DossierTextareaField;
