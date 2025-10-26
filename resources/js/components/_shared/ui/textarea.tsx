import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import * as React from 'react';

export const textareaVariants = cva(
    'border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
    {
        variants: {
            size: {
                md: '',
            },
            variant: {
                default: '',
            },
        },
        defaultVariants: {
            size: 'md',
            variant: 'default',
        },
    },
);

export interface TextareaProps
    extends React.ComponentProps<'textarea'>,
        VariantProps<typeof textareaVariants> {}

function Textarea({ className, size, variant, ...props }: TextareaProps) {
    return (
        <textarea
            data-slot="textarea"
            className={cn(textareaVariants({ size, variant }), className)}
            {...props}
        />
    );
}

export { Textarea };
