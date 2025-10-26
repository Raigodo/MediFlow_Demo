import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

function DossierFieldShell({ children, className }: { children: ReactNode; className?: string }) {
    return (
        <div
            className={cn(
                'flex min-h-7 justify-between border-b-2 border-dotted px-1.5 py-0.5',
                className,
            )}
        >
            {children}
        </div>
    );
}

export { DossierFieldShell };
