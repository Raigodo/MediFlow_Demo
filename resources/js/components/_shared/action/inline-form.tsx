import { ResourceActionsItem } from '@/lib/types/models/reource-actions-item';
import { cn } from '@/lib/utils';
import { useForm } from '@inertiajs/react';
import { FormEvent, forwardRef, ReactNode } from 'react';
import { BaseFormProps } from '../form/base-form-props';
import SubmitButton from '../form/submit-button';
import { ButtonProps } from '../ui/button';

interface InlineFormProps extends Pick<ButtonProps, 'size'>, BaseFormProps {
    children: ReactNode;
    action: ResourceActionsItem;
    className?: string;
    variant?: 'dropdown' | 'standalone' | 'destructive';
}

const InlineForm = forwardRef<HTMLFormElement, InlineFormProps>(
    ({ action, onSuccess, variant = 'dropdown', size = 'sm', children, className }, ref) => {
        const { post, processing } = useForm({
            ...action.body,
            _method: action.method,
        });

        function submit(e: FormEvent) {
            e.preventDefault();
            post(action.url, { onSuccess });
        }

        return (
            <form ref={ref} onSubmit={submit}>
                <SubmitButton
                    variant={
                        variant === 'dropdown'
                            ? 'ghost'
                            : variant === 'destructive'
                              ? 'destructive'
                              : 'secondary'
                    }
                    size={size}
                    className={cn(
                        variant === 'dropdown' && 'w-full text-start font-normal',
                        variant === 'standalone' && 'bg-muted px-4',
                        className,
                    )}
                    processing={processing}
                >
                    {children}
                </SubmitButton>
            </form>
        );
    },
);

export default InlineForm;
