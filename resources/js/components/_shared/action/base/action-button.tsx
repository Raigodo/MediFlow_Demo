import { cn } from '@/lib/utils';
import { forwardRef, ReactNode } from 'react';
import { Button, ButtonProps } from '../../ui/button';

export type ActionButtonVariants = 'dropdown' | 'standalone' | 'destructive';

export type ActionButtonProps = {
    onClick?: () => void;
    className?: string;
    children: ReactNode;
    asChild?: boolean;
    variant: ActionButtonVariants;
    size?: ButtonProps['size'];
};

const ActionButton = forwardRef<HTMLButtonElement, ActionButtonProps>(
    ({ className, children, variant, size = 'sm', ...props }, ref) => (
        <Button
            ref={ref}
            variant={
                variant === 'destructive'
                    ? 'destructive'
                    : variant === 'dropdown'
                      ? 'ghost'
                      : 'secondary'
            }
            size={size}
            type="button"
            className={cn(
                variant === 'dropdown' && 'w-full items-start justify-start text-start font-normal',
                variant === 'standalone' && 'bg-muted',
                className,
            )}
            {...props}
        >
            {children}
        </Button>
    ),
);

export default ActionButton;
