import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

function PreviewModalField({ children, className }: { children: ReactNode; className?: string }) {
    return (
        <div
            className={cn(
                'flex min-h-7 justify-between border-b-2 border-dotted py-0.5 pr-4 pl-2 text-sm',
                className,
            )}
        >
            {children}
        </div>
    );
}

export default PreviewModalField;
