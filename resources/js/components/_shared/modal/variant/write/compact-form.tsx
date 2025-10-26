import { cn } from '@/lib/utils';
import i18next from 'i18next';
import { FormEvent, ReactNode } from 'react';
import SubmitButton from '../../../form/submit-button';
import { Label } from '../../../ui/label';

function CompactForm({
    onSubmit,
    children,
    processing,
    className,
    renderCancelButton,
}: {
    onSubmit: () => void;
    children: ReactNode;
    processing: boolean;
    className?: string;
    renderCancelButton?: ReactNode;
}) {
    function submit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        onSubmit();
    }

    return (
        <form
            onSubmit={submit}
            className={cn('grid grid-rows-[minmax(0,1fr)_auto] gap-y-6', className)}
        >
            <div className="space-y-6">{children}</div>
            <div className="mt-2 flex justify-end gap-x-4">
                {renderCancelButton}
                <SubmitButton processing={processing} className="min-w-[20%] shadow-md">
                    {i18next.t('submit')}
                </SubmitButton>
            </div>
        </form>
    );
}

function CompactFormRow({ children, className }: { children: ReactNode; className?: string }) {
    return (
        <div
            className={cn(
                'grid [grid-template-columns:repeat(auto-fit,minmax(0,1fr))] gap-4',
                className,
            )}
        >
            {children}
        </div>
    );
}

function CompactFormField({
    label,
    children,
    className,
}: {
    children: ReactNode;
    label: string;
    className?: string;
}) {
    return (
        <div className={cn('flex flex-col gap-1', className)}>
            <Label>{label}</Label>
            {children}
        </div>
    );
}

function CompactFormSection({
    label,
    children,
    className,
}: {
    children: ReactNode;
    label: string;
    className?: string;
}) {
    return (
        <div className={className}>
            <div className="border-primary border border-l-4">
                <Label className="py-2 pl-3">{label}</Label>
            </div>
            <div className="ml-2 space-y-6 border-l pt-3 pb-2 pl-2">{children}</div>
        </div>
    );
}

export { CompactForm, CompactFormField, CompactFormRow, CompactFormSection };
