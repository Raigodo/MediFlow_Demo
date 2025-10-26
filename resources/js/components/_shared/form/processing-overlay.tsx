import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { LoadingSpinner } from '../ui/loading-spinner';

function ProcessingOverlay({
    children,
    className,
    processing,
}: {
    children: ReactNode;
    className?: string;
    processing?: boolean;
}) {
    return (
        <div className={cn('relative size-full', className)}>
            <div className={processing ? 'opacity-20' : ''}>{children}</div>
            {processing && (
                <div className="absolute top-0 right-0 bottom-0 left-0 grid size-full">
                    <LoadingSpinner className="size-5 place-self-center" />
                </div>
            )}
        </div>
    );
}

export default ProcessingOverlay;
