import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const inputVariants = cva(
    'flex w-full min-w-0 bg-transparent text-base placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground shadow-xs outline-none transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
    {
        variants: {
            variant: {
                default:
                    'border border-input rounded-md px-3 py-1 focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:border-ring',
                underline:
                    'border-0 shadow-none border-b border-input px-2 pt-1 pb-0 focus-visible:border-ring focus-visible:shadow-[0_1.5px_0_0_var(--ring)] [&:not(:focus-visible):hover]:shadow-[0_0.75px_0_0_var(--ring)]',
            },
            inputSize: {
                default: 'h-9 md:text-sm',
                sm: 'h-8 md:text-sm',
                lg: 'h-10 text-lg',
                md: 'h-9 text-md',
                xl: 'h-11 pb-1 pt-2 text-2xl md:text-2xl',
            },
        },
        defaultVariants: {
            variant: 'default',
            inputSize: 'default',
        },
    },
);

export type InputProps = React.ComponentProps<typeof Slot> &
    VariantProps<typeof inputVariants> & {
        asChild?: boolean;
    } & React.ComponentProps<'input'>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, variant, inputSize, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : 'input';
        return (
            <Comp
                ref={ref}
                className={cn(inputVariants({ variant, inputSize, className }))}
                {...props}
            />
        );
    },
);
Input.displayName = 'Input';

export { Input, inputVariants };
