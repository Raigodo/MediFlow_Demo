import { cn } from '@/lib/utils';
import { Button, ButtonProps } from '../ui/button';
import ProcessingOverlay from './processing-overlay';

interface SubmitButtonProps extends ButtonProps {
    processing: boolean;
}

function SubmitButton({ processing, children, className, ...rest }: SubmitButtonProps) {
    return (
        <Button
            type="submit"
            size={'default'}
            {...rest}
            className={cn('text-center', className)}
            inert={processing}
        >
            <ProcessingOverlay processing={processing}>{children}</ProcessingOverlay>
        </Button>
    );
}

export default SubmitButton;
