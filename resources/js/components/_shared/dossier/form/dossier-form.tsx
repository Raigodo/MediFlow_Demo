import { ResourceActionsItem } from '@/lib/types/models/reource-actions-item';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import i18next from 'i18next';
import { ReactNode } from 'react';
import SubmitButton from '../../form/submit-button';
import { buttonVariants } from '../../ui/button';
import { Label } from '../../ui/label';
import { DossierLayout } from '../dossier-layout';
import { DossierContentShell, DossierHeaderShell } from '../dossier-main';
import { DossierFieldShell } from '../field/dossier-field-shell';

interface DossierFormProps {
    onSubmit: () => void;
    children: ReactNode;
    className?: string;
    processing: boolean;
    backAction: ResourceActionsItem;
    classNames?: {
        actionPanel?: string;
    };
    renderCancelButton?: ReactNode;
}

function DossierForm({
    onSubmit,
    children,
    className,
    processing,
    backAction,
    classNames,
    renderCancelButton,
}: DossierFormProps) {
    function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        onSubmit();
    }

    return (
        <form onSubmit={submit} className={cn('space-y-12', className)}>
            <DossierLayout>{children}</DossierLayout>

            <div className={cn('flex justify-end gap-2 pb-6', classNames?.actionPanel)}>
                {renderCancelButton && <>{renderCancelButton}</>}
                {!renderCancelButton && (
                    <Link
                        href={backAction.url}
                        type="button"
                        className={cn(buttonVariants({ variant: 'secondary' }))}
                    >
                        {i18next.t('cancel')}
                    </Link>
                )}
                <SubmitButton processing={processing}>{i18next.t('submit')}</SubmitButton>
            </div>
        </form>
    );
}

interface DossierFormHeaderProps {
    children: ReactNode;
    subtitle: string;
    renderIcon: ReactNode;
}

function DossierFormHeader({ children, subtitle, renderIcon }: DossierFormHeaderProps) {
    return (
        <DossierHeaderShell>
            <div className="flex gap-x-4 pb-2">
                {renderIcon && <div className="size-16">{renderIcon}</div>}
                <div className="grow space-y-2">
                    <div className="grid [grid-template-columns:repeat(auto-fit,minmax(0,1fr))] gap-4">
                        {children}
                    </div>
                    <div className="text-md text-muted-foreground w-fit max-w-full min-w-32 truncate border-b px-2 py-0.5">
                        {subtitle}
                    </div>
                </div>
            </div>
        </DossierHeaderShell>
    );
}

function DossierFormContent({ children, className }: { children: ReactNode; className?: string }) {
    return (
        <DossierContentShell className={cn('space-y-1.5 pt-6 pb-8', className)}>
            {children}
        </DossierContentShell>
    );
}

interface DossierFormFieldProp {
    children: ReactNode;
    className?: string;
    label: string;
    href?: string;
}

function DossierFormField({ children, className, label, href }: DossierFormFieldProp) {
    if (href)
        return (
            <Link href={href} className="hover:bg-muted">
                <DossierFieldShell className={className}>
                    <Label>{label}</Label>
                    {children}
                </DossierFieldShell>
            </Link>
        );

    return (
        <DossierFieldShell className={className}>
            <Label>{label}</Label>
            {children}
        </DossierFieldShell>
    );
}

interface DossierFormSectionProp {
    children: ReactNode;
    className?: string;
    label: string;
}

function DossierFormSection({ children, className, label }: DossierFormSectionProp) {
    return (
        <div className={cn('mt-4 space-y-2.5 px-2', className)}>
            <Label className="px-2">{label}</Label>
            {children}
        </div>
    );
}

export { DossierForm, DossierFormContent, DossierFormField, DossierFormHeader, DossierFormSection };
